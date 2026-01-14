import React, { useState } from 'react';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { MarketData, AIAnalysisResult } from '../types';
import { analyzeMarketPrices } from '../services/geminiService';

interface AIAnalystProps {
  data: MarketData;
}

const AIAnalyst: React.FC<AIAnalystProps> = ({ data }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeMarketPrices(data);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!analysis && !loading) {
    return (
      <button 
        onClick={handleAnalyze}
        className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all active:scale-95"
      >
        <Sparkles className="w-5 h-5" />
        Get AI Market Analysis
      </button>
    );
  }

  if (loading) {
    return (
      <div className="w-full mt-4 h-32 flex flex-col items-center justify-center bg-white rounded-xl border border-indigo-100">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
        <span className="text-sm text-gray-500 animate-pulse">Consulting Gemini Expert...</span>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 bg-white rounded-xl border border-indigo-100 shadow-md overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-indigo-500"></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-gray-800">AI Market Insight</h4>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide
            ${analysis?.recommendation === 'BUY' ? 'bg-green-100 text-green-700' : 
              analysis?.recommendation === 'WAIT' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}
          >
            VERDICT: {analysis?.recommendation}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {analysis?.summary}
        </p>
        
        <div className="bg-indigo-50 rounded-lg p-3 flex items-start gap-3">
          <Info className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
          <div className="text-xs text-indigo-800">
            <span className="font-bold">Best Deal:</span> {analysis?.bestDeal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyst;