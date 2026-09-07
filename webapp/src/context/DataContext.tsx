import Papa from "papaparse";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DateRange, OrderRow } from "../types";
import { dateInputValue } from "../lib/utils";

type DataContextValue = {
  rows: OrderRow[];
  filteredRows: OrderRow[];
  range: DateRange;
  setRange: (range: DateRange) => void;
  isLoading: boolean;
  error: string | null;
  dateBounds: DateRange;
};

const DataContext = createContext<DataContextValue | null>(null);

const value = (input: unknown) => String(input ?? "").trim();
const numeric = (input: unknown) => Number(input) || 0;

const toRow = (record: Record<string, unknown>): OrderRow => ({
  rowId: numeric(record["Row ID"]),
  orderId: value(record["Order ID"]),
  orderDate: new Date(`${value(record["Order Date"])}T00:00:00`),
  shipDate: new Date(`${value(record["Ship Date"])}T00:00:00`),
  shipMode: value(record["Ship Mode"]),
  customerId: value(record["Customer ID"]),
  customerName: value(record["Customer Name"]),
  segment: value(record.Segment),
  country: value(record.Country),
  city: value(record.City),
  state: value(record.State),
  postalCode: value(record["Postal Code"]),
  region: value(record.Region),
  productId: value(record["Product ID"]),
  category: value(record.Category),
  subCategory: value(record["Sub-Category"]),
  productName: value(record["Product Name"]),
  sales: numeric(record.Sales),
  quantity: numeric(record.Quantity),
  discount: numeric(record.Discount),
  profit: numeric(record.Profit),
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [range, setRange] = useState<DateRange>({ startDate: "", endDate: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Papa.parse<Record<string, unknown>>(`${import.meta.env.BASE_URL}data/superstore_clean.csv`, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data, errors }) => {
        if (errors.length) setError("The cleaned CSV could not be parsed.");
        const parsed = data.map(toRow).filter((row) => !Number.isNaN(row.orderDate.getTime()));
        setRows(parsed);
        if (parsed.length) {
          const dates = parsed.map((row) => row.orderDate.getTime());
          setRange({
            startDate: dateInputValue(new Date(Math.min(...dates))),
            endDate: dateInputValue(new Date(Math.max(...dates))),
          });
        }
        setIsLoading(false);
      },
      error: () => {
        setError("The cleaned CSV could not be loaded. Run `npm run copy-data` and refresh.");
        setIsLoading(false);
      },
    });
  }, []);

  const dateBounds = useMemo(() => {
    if (!rows.length) return { startDate: "", endDate: "" };
    const dates = rows.map((row) => row.orderDate.getTime());
    return { startDate: dateInputValue(new Date(Math.min(...dates))), endDate: dateInputValue(new Date(Math.max(...dates))) };
  }, [rows]);

  const filteredRows = useMemo(
    () => rows.filter((row) => {
      const date = dateInputValue(row.orderDate);
      return (!range.startDate || date >= range.startDate) && (!range.endDate || date <= range.endDate);
    }),
    [range, rows],
  );

  return <DataContext.Provider value={{ rows, filteredRows, range, setRange, isLoading, error, dateBounds }}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used inside DataProvider");
  return context;
}
