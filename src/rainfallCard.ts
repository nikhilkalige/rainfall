export interface RainfallCardProps {
    value: number;
    unit?: string;
    trend?: "up" | "down";
    trendPercent?: number;
    subText: number | string;
    color?: string;
}

export function RainfallCard({
    value,
    unit = "inch",
    trend = "up",
    trendPercent,
    subText,
    color = "#4269d0"
}: RainfallCardProps): HTMLElement {
    const card = document.createElement("div");
    card.className = "rainfall-card";

    const trendArrow = trend === "up" ? "↗︎" : "↘︎";
    const trendClass = trend === "up" ? "green" : "red";

    card.innerHTML = `
    <div class="rain-header">
      <div class="value-box">
        <h1>
          ${value.toFixed(2)}
          <span> ${unit}</span>
          ${trendPercent !== undefined ? `<span class="${trendClass}">${trendArrow}</span>
          <span class="${trendClass}">${trendPercent.toFixed(2)} %</span>` : ""}
        </h1>
        <h2 style="color: ${color}">${subText}</h2>
      </div>
    </div>
  `;
    return card;
}

export function RainfallMonthCard({
    value,
    unit = "inch",
    trend = "up",
    trendPercent,
    subText,
    color = "#4269d0"
}: RainfallCardProps): HTMLElement {
    const card = document.createElement("div");
    card.className = "current-year-month-rain card";

    const trendArrow = trend === "up" ? "↗︎" : "↘︎";
    const trendClass = trend === "up" ? "green" : "red";

    card.innerHTML = `
    <div class="rain-header">
      <div class="value-box">
        <h1>
          ${value.toFixed(2)}
          <span> ${unit}</span>
          ${trendPercent !== undefined ? `<span class="${trendClass}">${trendArrow}</span>
          <span class="${trendClass}">${trendPercent.toFixed(2)} %</span>` : ""}
        </h1>
        <h2 style="color: ${color}">${subText}</h2>
      </div>
    </div>
  `;
    return card;
}