import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Competitor } from '../types';

interface PriceChartProps {
  competitors: Competitor[];
}

// Custom interface to handle Recharts tooltip props and avoid TS errors with TooltipProps
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg text-sm">
        <p className="font-bold text-gray-700 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ color: entry.color }} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="font-medium">{entry.name}:</span>
            <span>€{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PriceChart: React.FC<PriceChartProps> = ({ competitors }) => {
  // Transform data for Recharts: Array of objects where key is date, and other keys are store names
  const dataMap: Record<string, any> = {};

  competitors.forEach(comp => {
    comp.history.forEach(point => {
      if (!dataMap[point.date]) {
        dataMap[point.date] = { date: point.date };
      }
      dataMap[point.date][comp.name] = point.price;
    });
  });

  const chartData = Object.values(dataMap).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">30-Day Price History</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            domain={['auto', 'auto']}
            unit="€"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {competitors.map((comp) => (
            <Line
              key={comp.id}
              type="monotone"
              dataKey={comp.name}
              stroke={comp.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;