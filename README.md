# Palestine Data Visualizer

This project is a web application that visualizes various data related to Palestine. It aims to provide insights into different aspects of the region through interactive charts and dashboards.

## Features

- **Interactive Data Visualizations:** Explore various datasets through interactive charts (bar charts, line charts, pie charts).
- **Dashboard Overview:** A central dashboard providing key statistics and insights.
- **Specific Data Categories:**
    - Crime and Justice Statistics
    - Drug Crime Data
    - Homicide Statistics
    - Land Use Information
    - Martyrs and Fatalities Data
    - Settlement Data
- **Data Filtering:** Options to filter data by governorate, region, and year ranges (where applicable).

## Technologies Used

- **Frontend:**
    - React
    - TypeScript
    - Vite
    - Tailwind CSS
- **Charting:**
    - Chart.js
    - react-chartjs-2
- **Routing:**
    - React Router DOM
- **Animation:**
    - Framer Motion
- **Icons:**
    - Lucide React
- **UI Components:**
    - Material UI (for some components like icons and slider)
- **Linting & Formatting:**
    - ESLint

## Running the Project Locally

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
    *(Replace `<repository-url>` with the actual URL of the repository and `<repository-directory>` with the name of the cloned folder, typically the project name.)*

2.  **Install dependencies:**
    Make sure you have Node.js and npm (or yarn) installed.
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    This will start the Vite development server, and you should be able to view the application in your browser, usually at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run the following scripts:

-   `npm run dev` or `yarn dev`:
    Runs the app in development mode using Vite. Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to view it in your browser. The page will reload if you make edits.

-   `npm run build` or `yarn build`:
    Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

-   `npm run lint` or `yarn lint`:
    Lints the project files using ESLint to check for code quality and potential errors.

-   `npm run preview` or `yarn preview`:
    Serves the production build locally to preview the application as it would appear when deployed.

## Data Sources

The project utilizes various datasets related to Palestine, stored primarily as JSON files in the `src/data` directory. These include:

-   `alAqsaIntifadaMartyrs.json`: Data on martyrs during the Al-Aqsa Intifada.
-   `checkpoints.json`: Information about checkpoints.
-   `crimeJusticeStatisticsPalestine.json`: General crime and justice statistics.
-   `demolitions.json`: Data on demolitions.
-   `fatalities.json`: Information on fatalities.
-   `homicideAttemptedHomicideByGovernorate.json`: Homicide and attempted homicide data by governorate.
-   `homicidesByGovernorateSexYear.json`: Homicide data categorized by governorate, sex, and year.
-   `intifadaCasualties.json`: Casualties during the Intifada.
-   `minorsInCustody.json`: Data on minors in custody.
-   `palestine-data-combined.json`: A combined dataset.
-   `populationDemographics.json`: Population and demographic statistics.
-   `reportedDrugCrimesByGovernorate.json`: Drug crime data by governorate.
-   `waterAccessStatistics.json`: Statistics on water access.
-   `westBankLandUse2017.json`: Land use data for the West Bank from 2017.
-   `westBankSettlementIndicators.json`: Indicators related to West Bank settlements.
