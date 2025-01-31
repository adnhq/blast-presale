import React, { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

interface TokenData {
  name: string;
  value: number;
  description: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: TokenData;
  }>;
}

type ActiveShape<T> = (props: any) => React.ReactElement;

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: TokenData;
  percent: number;
  value: number;
  index: number;
}

const COLORS = [
  "#3B82F6", // Blue
  "#6366F1", // Indigo
  "#8B5CF6", // Purple
  "#A855F7", // Violet
  "#EC4899", // Pink
];

const data: TokenData[] = [
  { name: "Presale", value: 25, description: "Public token sale allocation" },
  { name: "Marketing", value: 25, description: "Marketing and partnerships" },
  {
    name: "Treasury",
    value: 25,
    description: "Project development and operations",
  },
  { name: "Liquidity", value: 10, description: "DEX liquidity provision" },
  { name: "Staking", value: 15, description: "Staking rewards for holders" },
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
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

const renderActiveShape: ActiveShape<PieSectorDataItem> = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;
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

const TokenomicsChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-4xl font-bold mb-2">Total Supply</h3>
        <p className="text-4xl md:text-6xl font-bold text-blue-400">
          10,000,000,000
        </p>
        <p className="text-lg md:text-xl text-gray-400 mt-2">$BLAST Tokens</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
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
                  activeIndex={activeIndex ?? undefined}
                  activeShape={renderActiveShape}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="transition-all duration-300 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300
                ${
                  activeIndex === index
                    ? "bg-white/5 scale-[1.02]"
                    : "hover:bg-white/5"
                }
                cursor-pointer`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
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
};

export default TokenomicsChart;
