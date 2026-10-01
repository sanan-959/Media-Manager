import React, { useState } from 'react';
import { chartTimeSeriesData } from '../../data/mockAnalytics';

interface MetricChartProps {
  timeRange: '7d' | '30d' | '3m';
  metricKey: 'reach' | 'engagement' | 'followers' | 'impressions';
  title: string;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const MetricChart: React.FC<MetricChartProps> = ({
  timeRange,
  metricKey,
  title,
  color = '#6366f1',
  gradientFrom = 'rgba(99, 102, 241, 0.35)',
  gradientTo = 'rgba(99, 102, 241, 0.0)',
}) => {
  const data = chartTimeSeriesData[timeRange] || chartTimeSeriesData['7d'];
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const values = data.map((d) => d[metricKey]);
  const maxValue = Math.max(...values, 100);
  const minValue = Math.min(...values, 0);

  const svgWidth = 600;
  const svgHeight = 200;
  const padding = 24;

  // Calculate coordinates
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (svgWidth - padding * 2);
    const y =
      svgHeight -
      padding -
      ((item[metricKey] - minValue) / (maxValue - minValue || 1)) * (svgHeight - padding * 2);
    return { x, y, label: item.date, value: item[metricKey] };
  });

  const pathD = points.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x},${point.y}` : `${acc} L ${point.x},${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight - padding} L ${points[0].x},${
    svgHeight - padding
  } Z`;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-4 shadow-2xs">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {title} ({timeRange.toUpperCase()})
        </h4>
        {hoverIndex !== null && (
          <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
            {points[hoverIndex].label}: {points[hoverIndex].value.toLocaleString()}
          </div>
        )}
      </div>

      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id={`grad-${metricKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientFrom || color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={gradientTo || color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path d={areaD} fill={`url(#grad-${metricKey})`} />

          {/* Line Path */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, i) => (
            <g key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoverIndex === i ? 5 : 3.5}
                fill={color}
                className="transition-all cursor-pointer stroke-2 stroke-white dark:stroke-slate-900"
              />
              {/* X Axis Labels */}
              <text
                x={pt.x}
                y={svgHeight - 6}
                textAnchor="middle"
                className="text-[9px] fill-slate-400 font-semibold"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
