# Executive Sales & Retail Analytics Dashboard

An interactive, production-grade retail analytics dashboard built from the Superstore dataset. The web application transforms raw sales data into actionable business insights—covering revenue performance, margin profitability, customer segmentation, product trends, and regional breakdowns.

Live Demo: [https://haiderimran019.github.io/Sales-Data-Dashboard/](https://haiderimran019.github.io/Sales-Data-Dashboard/)
GitHub Repository: [https://github.com/haiderimran019/Sales-Data-Dashboard](https://github.com/haiderimran019/Sales-Data-Dashboard)

# ==================================================
KEY FEATURES & FUNCTIONAL MODULES

• Executive Overview (/): High-level KPI summary (Sales, Profit, Profit Margin, Total Orders, Average Order Value) with interactive trend indicators.
• Sales Performance (/sales): Monthly and quarterly revenue trajectories, regional sales distribution, and category performance.
• Profitability & Margins (/profitability): Margin analysis, discount impact visualization, and identification of loss-making product categories.
• Customer Insights (/customers): Customer lifetime value metrics, order frequency analysis, and segment breakdowns (Consumer, Corporate, Home Office).
• Product Explorer (/products): Dynamic searchable table with multi-column sorting, filterable by sub-category, and data export capability.
• Business Insights (/insights): Automated data narrative highlighting key operational takeaways and data preparation methodologies.
• Interactive Controls: Date-range filtering, dynamic KPI calculations, light/dark mode toggling, responsive charts, and smooth page transitions.

# ==================================================
TECHNOLOGY STACK

Frontend & User Interface:
• React 18: Modern component-driven UI library.
• TypeScript: Strict type safety across raw dataset schemas, analytics functions, and component props.
• Vite: Next-generation frontend build tool and dev server.
• Tailwind CSS: Utility-first CSS framework for layout, typography, dark mode, and responsive design.
• Recharts: Composible charting library powering interactive bar, line, and donut charts.
• React Router v6: Client-side single-page routing between analytical views.
• Framer Motion: Subtle spring-based page and card transitions.
• Lucide React: Clean vector icon suite.
• Papa Parse: In-browser client-side CSV parsing.

Data Analysis & Processing Layer:
• Python: Core language used for data extraction, cleaning, and preprocessing.
• Pandas & Jupyter Notebooks: Exploratory Data Analysis (EDA), feature engineering, handling missing values, and exporting the final production-ready dataset.

# ==================================================
END-TO-END DATA PIPELINE

1. Extraction & Cleaning: Raw retail data is processed in Python Jupyter Notebooks to remove duplicates, format dates, and engineer profit margin columns.
2. Asset Bundling: The build script (copy-data.mjs) automatically syncs superstore_clean.csv into the web application's public assets folder.
3. Client Ingestion: Papa Parse asynchronously fetches and parses the CSV into structured JSON objects upon initial page load.
4. Context & State Management: DataContext.tsx normalizes date fields, computes cross-view aggregations, and distributes state throughout the component tree.

# ==================================================
REPOSITORY STRUCTURE

Sales-Data-Dashboard/
├── .github/
│   └── workflows/
│       └── deploy.yml            Automated CI/CD pipeline for GitHub Pages
├── data/
│   ├── raw/                      Original raw Superstore dataset
│   └── processed/                Cleaned CSV dataset output by Python
├── notebooks/
│   ├── 01_data_cleaning.ipynb    Python cleaning & validation steps
│   └── 02_sales_analysis.ipynb   Exploratory data analysis notebooks
├── webapp/
│   ├── public/                   Public assets (includes superstore_clean.csv)
│   ├── src/
│   │   ├── components/           Reusable KPI cards, charts, headers, filters
│   │   ├── context/              DataContext.tsx for state & CSV ingestion
│   │   ├── pages/                Overview, Sales, Profit, Customer, Product pages
│   │   ├── types/                TypeScript interface definitions
│   │   ├── App.tsx               Main routing & application entry
│   │   └── AppShell.tsx          Navigation shell & layout header
│   ├── copy-data.mjs             Data synchronization script
│   ├── package.json              Dependencies and build scripts
│   └── vite.config.ts            Vite configuration
└── README.md                     Project documentation

# ==================================================
GETTING STARTED LOCALLY

Prerequisites:
• Node.js (v18.0 or higher)
• npm (v9.0 or higher)

Setup Instructions:

1. Clone the Repository:
git clone [https://github.com/haiderimran019/Sales-Data-Dashboard.git](https://github.com/haiderimran019/Sales-Data-Dashboard.git)
cd Sales-Data-Dashboard/webapp
2. Install Dependencies:
npm install
3. Start Development Server:
npm run dev
4. Build for Production:
npm run build

# ==================================================
CONTINUOUS INTEGRATION & DEPLOYMENT (CI/CD)

The project leverages GitHub Actions for continuous deployment to GitHub Pages.

The workflow configuration (.github/workflows/deploy.yml) automates the deployment cycle on every push to the main branch:

1. Checkout: Clones the latest commit from main.
2. Environment Setup: Configures Node.js execution environment.
3. Build: Executes npm ci and npm run build to output optimized static assets in dist/.
4. Deploy: Uploads the production bundle directly to the gh-pages deployment branch.

# ==================================================
AUTHOR

Haider Imran
GitHub: [https://github.com/haiderimran019](https://www.google.com/search?q=https://github.com/haiderimran019)
Project Link: [https://github.com/haiderimran019/Sales-Data-Dashboard](https://github.com/haiderimran019/Sales-Data-Dashboard)
