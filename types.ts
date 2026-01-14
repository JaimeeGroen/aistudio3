export interface PricePoint {
  date: string; // ISO date string YYYY-MM-DD
  price: number;
}

export interface Competitor {
  id: string;
  name: string;
  url: string;
  color: string;
  currentPrice: number;
  history: PricePoint[];
}

export interface MarketData {
  productName: string;
  imageUrl: string;
  competitors: Competitor[];
}

export interface AIAnalysisResult {
  recommendation: 'BUY' | 'WAIT' | 'NEUTRAL';
  summary: string;
  bestDeal: string;
}