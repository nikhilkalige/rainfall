import './css/style.css'
import './css/theme-midnight.css'

import { calculateYearlyRainfall, getRainfallData, type RainfallData } from './sheetsData.ts'
import { RainfallCard } from './rainfallCard.ts';


function displayCurrentYearStats(data: RainfallData, year: number) {
  const stats = calculateYearlyRainfall(data);

  // Display card for the yearly information
  const yearCard = RainfallCard({
    value: stats.total,
    trendPercent: 10,
    subText: year
  });
  document.getElementById("current-year-rain")?.append(yearCard);

  // Display month cards
  const monthlyCards = stats.monthly.map((monthData) => {
    return RainfallCard({
      value: monthData.total,
      trendPercent: 10,
      subText: monthData.month
    })
  });

  document.getElementById("current-year-month-container")?.append(...monthlyCards);
}


(async () => {
  const YEAR = 2011;
  const rainfallData = await getRainfallData(YEAR);
  displayCurrentYearStats(rainfallData, YEAR);




})();