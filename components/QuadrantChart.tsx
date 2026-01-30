
import React, { useState } from 'react';
import { COLORS } from '../constants';
import { Option } from '../types';

interface QuadrantChartProps {
  placements: Option[];
}

const QuadrantChart: React.FC<QuadrantChartProps> = ({ placements }) => {
  const [activePoint, setActivePoint] = useState<Option | null>(null);

  // Map score to SVG coordinates (0-100 score -> 10-190 svg coordinate)
  const mapCoord = (val: number) => 10 + (val / 100) * 180;

  // Determine color based on quadrant
  const getPointColor = (x: number, y: number) => {
    if (x >= 50 && y >= 50) return '#b91c1c'; // Top-Right (Most Dark/Urgent)
    if (x < 50 && y >= 50) return '#ea580c';  // Top-Left
    if (x >= 50 && y < 50) return '#facc15';  // Bottom-Right
    return '#86efac'; // Bottom-Left (Lightest)
  };

  return (
    <div className="w-full">
      <div className="relative aspect-square w-full max-w-[340px] mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
            </marker>
          </defs>

          {/* Background Quadrants */}
          <rect x="0" y="0" width="100" height="100" fill="#fee2e2" fillOpacity="0.4" />
          <rect x="100" y="0" width="100" height="100" fill="#ef4444" fillOpacity="0.1" />
          <rect x="0" y="100" width="100" height="100" fill="#fef9c3" fillOpacity="0.4" />
          <rect x="100" y="100" width="100" height="100" fill="#ecfccb" fillOpacity="0.4" />

          {/* Grid Lines */}
          <path d="M20 0 V200 M40 0 V200 M60 0 V200 M80 0 V200 M120 0 V200 M140 0 V200 M160 0 V200 M180 0 V200" stroke="#fff" strokeWidth="0.5" strokeDasharray="2,2" />
          <path d="M0 20 H200 M0 40 H200 M0 60 H200 M0 80 H200 M0 120 H200 M0 140 H200 M0 160 H200 M0 180 H200" stroke="#fff" strokeWidth="0.5" strokeDasharray="2,2" />

          {/* Axes */}
          <line x1="0" y1="100" x2="200" y2="100" stroke="#9ca3af" strokeWidth="1.5" />
          <line x1="100" y1="200" x2="100" y2="0" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

          {/* Labels - Increased font size and darkened */}
          <text x="195" y="115" fontSize="10" fill="#374151" fontWeight="bold" textAnchor="end">困難度</text>
          <text x="105" y="10" fontSize="10" fill="#374151" fontWeight="bold" textAnchor="start">重要性</text>

          {/* Zone Labels (Impressive Details) */}
          <text x="190" y="15" fontSize="8" fill="#b91c1c" opacity="0.6" fontWeight="bold" textAnchor="end">急迫且困難</text>
          <text x="10" y="15" fontSize="8" fill="#ea580c" opacity="0.6" fontWeight="bold" textAnchor="start">急迫但可控</text>
          <text x="190" y="190" fontSize="8" fill="#ca8a04" opacity="0.6" fontWeight="bold" textAnchor="end">長期需關注</text>
          <text x="10" y="190" fontSize="8" fill="#15803d" opacity="0.6" fontWeight="bold" textAnchor="start">相對穩定</text>

          {/* Points */}
          {placements.map((p, idx) => (
            p.x > 0 && (
              <g 
                key={idx} 
                onMouseEnter={() => setActivePoint(p)}
                onMouseLeave={() => setActivePoint(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulse Effect for High Importance Points */}
                {p.y > 70 && (
                   <circle cx={mapCoord(p.x)} cy={200 - mapCoord(p.y)} r="12" fill={getPointColor(p.x, p.y)} opacity="0.2">
                      <animate attributeName="r" from="6" to="16" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                   </circle>
                )}
                
                {/* Invisible larger circle for easier hovering */}
                <circle cx={mapCoord(p.x)} cy={200 - mapCoord(p.y)} r="12" fill="transparent" />
                <circle 
                  cx={mapCoord(p.x)} 
                  cy={200 - mapCoord(p.y)} 
                  r={activePoint?.id === p.id ? "9" : "6"}
                  fill={getPointColor(p.x, p.y)} 
                  className="transition-all duration-300 hover:opacity-100 opacity-90 shadow-sm"
                  stroke={activePoint?.id === p.id ? "#333" : "#fff"}
                  strokeWidth={2}
                />
              </g>
            )
          ))}

          {/* Tooltip Overlay within SVG for simple positioning */}
          {activePoint && (
            <g pointerEvents="none">
               <rect 
                  x={Math.min(120, Math.max(0, mapCoord(activePoint.x) - 40))} 
                  y={Math.min(170, Math.max(20, 200 - mapCoord(activePoint.y) - 40))} 
                  width="80" 
                  height="35" 
                  rx="6" 
                  fill="rgba(0,0,0,0.9)" 
               />
               <text 
                  x={Math.min(120, Math.max(0, mapCoord(activePoint.x) - 40)) + 40} 
                  y={Math.min(170, Math.max(20, 200 - mapCoord(activePoint.y) - 40)) + 14} 
                  fontSize="8" 
                  fill="white" 
                  textAnchor="middle" 
                  fontWeight="bold"
               >
                 {activePoint.label.substring(0, 8)}{activePoint.label.length > 8 ? '...' : ''}
               </text>
               <text 
                  x={Math.min(120, Math.max(0, mapCoord(activePoint.x) - 40)) + 40} 
                  y={Math.min(170, Math.max(20, 200 - mapCoord(activePoint.y) - 40)) + 26} 
                  fontSize="7" 
                  fill="#ddd" 
                  textAnchor="middle"
               >
                 困: {activePoint.x} / 重: {activePoint.y}
               </text>
            </g>
          )}
        </svg>
      </div>
      <p className="text-center text-base text-gray-600 mt-4">（將游標移至圓點可查看詳細項目與數值）</p>
      <div className="mt-6 grid grid-cols-2 gap-4 text-base text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#b91c1c]"></div> 高重要/高難度</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ea580c]"></div> 高重要/低難度</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#facc15]"></div> 低重要/高難度</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#86efac]"></div> 低重要/低難度</div>
      </div>
    </div>
  );
};

export default QuadrantChart;
