import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';

const COLORS = [
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
  '#A855F7', // Violet
  '#EC4899'  // Pink
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
      <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
        <p className="font-bold text-lg">{data.name}</p>
        <p className="text-2xl font-bold text-blue-400">{data.value}%</p>
        <p className="text-sm text-gray-300 mt-1">{data.description}</p>
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
        outerRadius={outerRadius + 4}
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

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full">
      {/* Total Supply Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-4xl font-bold mb-2">
          Total Supply
        </h3>
        <p className="text-4xl md:text-6xl font-bold text-blue-400">
          10,000,000,000
        </p>
        <p className="text-lg md:text-xl text-gray-400 mt-2">
          $BLAST Tokens
        </p>
      </div>

      {/* Chart and Legend Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Chart Section */}
        <div className="w-full lg:w-1/2">
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index]}
                      className="transition-all duration-300 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend Section */}
        <div className="w-full lg:w-1/2 space-y-3">
          {data.map((item, index) => (
            <div 
              key={item.name}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300
                ${activeIndex === index ? 'bg-white/5 scale-[1.02]' : 'hover:bg-white/5'}
                cursor-pointer`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div 
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-4">
                  <span className="font-medium text-base md:text-lg truncate">
                    {item.name}
                  </span>
                  <span className="font-bold text-lg md:text-xl text-blue-400 shrink-0">
                    {item.value}%
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-0.5 truncate">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}