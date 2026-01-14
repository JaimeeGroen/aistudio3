import React, { useEffect, useState } from 'react';
import { fetchMarketData } from './services/mockData';
import { MarketData } from './types';
import PriceChart from './components/PriceChart';
import CompetitorList from './components/CompetitorList';
import AIAnalyst from './components/AIAnalyst';
import { LayoutDashboard, RefreshCw, AlertCircle } from 'lucide-react';

function App() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchMarketData();
    setData(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Padel<span className="text-indigo-600">Tracker</span></h1>
          </div>
          <button 
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {!data && loading ? (
           <div className="flex flex-col items-center justify-center h-96">
             <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
             <p className="mt-4 text-gray-500 font-medium">Scanning padel stores...</p>
           </div>
        ) : data ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Product Info & Actions */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 text-center">
                <div className="relative aspect-[4/5] w-full mb-6 bg-gray-100 rounded-xl overflow-hidden group">
                  <img 
                    src={data.imageUrl} 
                    alt={data.productName}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                    ST4 PRO
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.productName}</h2>
                <p className="text-gray-500 text-sm mb-4">Professional Padel Racket • 2025 Edition</p>
                
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Lowest Price</span>
                  <span className="text-3xl font-bold text-gray-900">
                    €{Math.min(...data.competitors.map(c => c.currentPrice))}
                  </span>
                </div>
              </div>

              {/* AI Analyst Widget */}
              <AIAnalyst data={data} />
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Tracker Status: Active</p>
                  <p className="opacity-80">Monitoring 6 vendors daily. Last update: Just now.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Chart & List */}
            <div className="lg:col-span-8 space-y-6">
              <PriceChart competitors={data.competitors} />
              <CompetitorList competitors={data.competitors} />
            </div>

          </div>
        ) : (
          <div className="text-center py-20 text-red-500">Failed to load data.</div>
        )}
      </main>
    </div>
  );
}

export default App;