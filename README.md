# Rainfall Visualization Project

This project visualizes rainfall data fetched from Google Sheets using Vite, D3, and Observable Plot. It is designed to be easily deployable on GitHub Pages with automated builds through GitHub Actions.

## Project Structure

```
rainfall-viz
├── src
│   ├── main.ts               # Entry point of the application
│   ├── api
│   │   └── fetchSheet.ts     # Fetches data from Google Sheets
│   ├── components
│   │   └── RainfallPlot.ts    # Renders the rainfall plot using D3 and Observable Plot
│   └── types
│       └── index.ts          # TypeScript interfaces for data structures
├── public
│   └── index.html            # Main HTML file for the application
├── .github
│   └── workflows
│       └── deploy.yml        # GitHub Action workflow for deployment
├── flake.nix                 # Nix configuration for development environment
├── package.json              # npm configuration and dependencies
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/rainfall-viz.git
   cd rainfall-viz
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   This will start the Vite development server, and you can view the application in your browser at `http://localhost:3000`.

## Usage

- The application fetches rainfall data from a specified Google Sheets URL and visualizes it using D3 and Observable Plot.
- You can modify the `fetchSheet.ts` file to change the Google Sheets URL or the data processing logic as needed.

## Deployment

This project is set up to automatically deploy to GitHub Pages. Whenever changes are pushed to the main branch, the GitHub Action defined in `.github/workflows/deploy.yml` will build the project and deploy the assets.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.