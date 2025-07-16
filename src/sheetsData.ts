

const API_KEY: string = 'AIzaSyChE7k3lj_HAvd6NWFfdktn_d_UB8kpi_g';
const SHEET_ID = '1O8c-mRf3hNjTZsxm_6A0zTZhj017Awmj5UjUQQFBoX0';

const SHEETS_URL = (range: any) => `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

type SheetResponse = {
    range: string;
    majorDimension: string;
    values: string[][];
}

/**
 * Represents a single data point of rainfall measurement for a specific day.
 * @property day - The date of the rainfall measurement.
 * @property amount - The amount of rainfall measured in inches for the given day.
 */
export type RainDataPoint = {
    day: Date,
    amount: number,
}

export type RainfallData = {
    data: RainDataPoint[];
    year: number;
};

export type MonthlyRainfall = {
    month: string,
    total: number
};

export type YearlyRainfall = {
    total: number,
    monthly: MonthlyRainfall[];
};

const MonthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


/**
 * Wrapper to cache fetch results in sessionStorage.
 */
async function fetchWithSessionCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = sessionStorage.getItem(key);
    if (cached) {
        try {
            return JSON.parse(cached) as T;
        } catch {
            // If parsing fails, ignore and fetch fresh
        }
    }
    const result = await fetcher();
    sessionStorage.setItem(key, JSON.stringify(result));
    return result;
}


// You need to set up Google API credentials and OAuth2 client
export async function getRainfallData(year: number) {
    const cache_key = `rainfall_${year}`;
    const data = await fetchWithSessionCache(cache_key, async () => {
        const url = SHEETS_URL(year);
        const response = await fetch(url);
        let data: SheetResponse = await response.json();

        if (!data.values || !Array.isArray(data.values)) {
            throw new Error('Invalid data: "values" field is missing or not an array.');
        }
        return data;
    });
    return parseSheetRainfallData(data, year);
}

function parseSheetRainfallData(data: SheetResponse, year: number): RainfallData {
    const rainData: RainDataPoint[] = data.values.slice(1).map(
        row => {
            const [dateStr, amountStr] = row;
            return {
                day: new Date(dateStr),
                amount: Number(amountStr)
            };
        });
    return {
        data: rainData,
        year
    };
}

function calculateMonthlyRainfall(data: RainDataPoint[], month: number): MonthlyRainfall {
    const monthData = data.filter(point => point.day.getMonth() == month);
    const total = monthData.reduce((sum, point) => sum + point.amount, 0);
    return {
        month: MonthNames[month],
        total
    }
}

export function calculateYearlyRainfall(data: RainfallData): YearlyRainfall {
    const monthly = Array.from({ length: 12 }, (_, month) =>
        calculateMonthlyRainfall(data.data, month)
    );
    const total = data.data.reduce((sum, point) => sum + point.amount, 0);
    return {
        monthly,
        total
    }
}

