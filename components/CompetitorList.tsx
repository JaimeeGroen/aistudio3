import React from 'react';
import { ExternalLink, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { Competitor } from '../types';

interface CompetitorListProps {
  competitors: Competitor[];
}

const CompetitorList: React.FC<CompetitorListProps> = ({ competitors }) => {
  // Sort by price ascending (cheapest first)
  const sortedCompetitors = [...competitors].sort((a, b) => a.currentPrice - b.currentPrice);
  const bestPrice = sortedCompetitors[0].currentPrice;

  const getTrendIcon = (comp: Competitor) => {
    if (comp.history.length < 2) return <Minus className="w-4 h-4 text-gray-400" />;
    const prevPrice = comp.history[comp.history.length - 2].price;
    
    if (comp.currentPrice < prevPrice) return <TrendingDown className="w-4 h-4 text-green-500" />;
    if (comp.currentPrice > prevPrice) return <TrendingUp className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Available Stores</h3>
        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
          Best: €{bestPrice}
        </span>
      </div>
      <div className="divide-y divide-gray-100">
        {sortedCompetitors.map((comp) => (
          <div key={comp.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full shadow-sm" 
                style={{ backgroundColor: comp.color }} 
              />
              <div>
                <p className="font-medium text-gray-900">{comp.name}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  {getTrendIcon(comp)}
                  <span>Last check: Today</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`text-lg font-bold ${comp.currentPrice === bestPrice ? 'text-green-600' : 'text-gray-700'}`}>
                €{comp.currentPrice}
              </span>
              <a 
                href={comp.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                title={`Visit ${comp.name}`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorList;