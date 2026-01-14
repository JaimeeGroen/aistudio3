import { Competitor, MarketData } from '../types';

// Helper to generate random price fluctuations
const generateHistory = (basePrice: number, days: number): { date: string; price: number }[] => {
  const history = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random fluctuation between -15% and +10%
    const volatility = (Math.random() * 0.25) - 0.15;
    const price = Math.round(basePrice * (1 + volatility));
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: price
    });
  }
  return history;
};

const INITIAL_COMPETITORS: Competitor[] = [
  {
    id: 'justpadel',
    name: 'JustPadel',
    url: 'https://justpadel.com/products/siux-electra-st4-pro',
    color: '#ef4444', // red-500
    currentPrice: 280,
    history: generateHistory(290, 30)
  },
  {
    id: 'passasports',
    name: 'PassaSports',
    url: 'https://www.passasports.nl/siux-electra-stupa-pro-st4-112639',
    color: '#3b82f6', // blue-500
    currentPrice: 300,
    history: generateHistory(300, 30)
  },
  {
    id: 'hollandpadel',
    name: 'HollandPadel',
    url: 'https://hollandpadel.com/collections/siux/products/siux-electra-stupa-pro-st4-2025',
    color: '#f97316', // orange-500
    currentPrice: 275,
    history: generateHistory(285, 30)
  },
  {
    id: 'tennis-voordeel',
    name: 'Tennis Voordeel',
    url: 'https://www.tennis-voordeel.nl/siux-electra-pro-st4/',
    color: '#10b981', // emerald-500
    currentPrice: 265,
    history: generateHistory(270, 30)
  },
  {
    id: 'decathlon',
    name: 'Decathlon',
    url: 'https://www.decathlon.nl/sporten/padel/padel-racket-volwassenen?pdt-highlight=dff12a42-2531-4069-b253-281e869ee61b',
    color: '#0082c3', // decathlon blue
    currentPrice: 250,
    history: generateHistory(260, 30)
  },
  {
    id: 'padelnuestro',
    name: 'Padel Nuestro',
    url: 'https://www.padelnuestro.com/int/siux-electra-stupa-pro-st4-2025',
    color: '#8b5cf6', // violet-500
    currentPrice: 295,
    history: generateHistory(295, 30)
  }
];

// Ensure the current price matches the last history entry for consistency
INITIAL_COMPETITORS.forEach(comp => {
  const lastEntry = comp.history[comp.history.length - 1];
  comp.currentPrice = lastEntry.price;
});

export const MOCK_MARKET_DATA: MarketData = {
  productName: 'Siux Electra ST4 Pro',
  // Using a specific placeholder size to simulate a product image
  imageUrl: 'https://picsum.photos/400/500', 
  competitors: INITIAL_COMPETITORS
};

/**
 * Simulates fetching data from a database.
 * In a real application, this would fetch from an API endpoint 
 * connected to a database populated by a daily cron scraper.
 */
export const fetchMarketData = (): Promise<MarketData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_MARKET_DATA);
    }, 800); // Simulate network latency
  });
};