import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";

const COLORS = [
  'from-pink-500 to-rose-600',
  'from-violet-500 to-purple-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500'
];

const SOLID_COLORS = [
  '#EC4899',
  '#8B5CF6',
  '#3B82F6',
  '#10B981',
  '#F59E0B'
];

const data = [
  { name: "Presale", value: 25, description: "Public token sale allocation" },
  { name: "Marketing", value: 25, description: "Marketing and partnerships" },
  { name: "Treasury", value: 25, description: "Project development and operations" },
  { name: "Liquidity", value: 10, description: "DEX liquidity provision" },
  { name: "Staking", value: 15, description: "Staking rewards for holders" }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/90 backdrop-blur-lg p-6 rounded-xl border border-gray-800 shadow-xl">
        <p className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          {data.name}
        </p>
        <p className="text-3xl font-bold mt-1">{data.value}%</p>
        <p className="text-gray-300 mt-2 text-sm">{data.description}</p>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-lg"
      />
    </g>
  );
};

export default function TokenomicsChart() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rotateAngle, setRotateAngle] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-8 max-w-4xl mx-auto border-gray-800 shadow-2xl">
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl -z-10" />
        <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Total Supply
        </h3>
        <p className="text-6xl font-bold tracking-tight">
          10,000,000,000
        </p>
        <p className="text-xl text-gray-400 mt-4 font-medium">$BLAST Tokens</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                startAngle={90 + rotateAngle}
                endAngle={450 + rotateAngle}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={SOLID_COLORS[index]}
                    className="transition-all duration-300 cursor-pointer drop-shadow-lg"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4">
          {data.map((item, index) => (
            <div 
              key={item.name} 
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                ${activeIndex === index ? 'bg-white/10 scale-105' : 'hover:bg-white/5'}
                cursor-pointer backdrop-blur-sm`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${COLORS[index]}`} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{item.name}</span>
                  <span className="font-bold text-xl">{item.value}%</span>
                </div>
                <p className="text-gray-400 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}