import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTimeline } from "../components/context/TimelineContext";


const COLORS = ["#1e4d3b", "#7c5cbf", "#3d9970"];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Stats = () => {
  const { timeline } = useTimeline();

  const data = [
    { name: "Call", value: timeline.filter(t => t.type === "Call").length },
    { name: "Text", value: timeline.filter(t => t.type === "Text").length },
    { name: "Video", value: timeline.filter(t => t.type === "Video").length },
  ];

  const total = data.reduce((s, d) => s + d.value, 0);

  const summaryCards = [
    { label: "Call", value: data[0].value, bg: "bg-[#e8f0ec]", text: "text-[#1e4d3b]" },
    { label: "Text", value: data[1].value, bg: "bg-[#eeedfe]", text: "text-[#534ab7]" },
    { label: "Video", value: data[2].value, bg: "bg-[#e8f5ee]", text: "text-[#2d6b51]" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f5] px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">

        <h1 className="text-3xl font-bold text-[#0f2d22]">Friendship Analytics</h1>

        {/* Chart Card */}
        <div className="bg-white rounded-md border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-2">By Interaction Type</p>

          {total === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-12 h-12 rounded-full bg-[#e8f0ec] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#1e4d3b" strokeWidth="1.5" />
                  <path d="M10 7v4" stroke="#1e4d3b" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="13.5" r="0.75" fill="#1e4d3b" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 text-center">
                No data yet.<br />Log interactions from a friend's page to see analytics.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={115}
                  paddingAngle={3}
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} interactions`, name]}
                  contentStyle={{
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    fontSize: 13,
                    color: '#0f2d22',
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: 13, color: '#6b7280' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          {summaryCards.map(({ label, value, bg, text }) => (
            <div key={label} className="bg-white rounded-md border border-gray-100 p-5 text-center">
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${bg} ${text}`}>
                {label}
              </span>
              <p className="text-3xl font-bold text-[#0f2d22] mt-3">{value}</p>
              <p className="text-xs text-gray-400 mt-1">interactions</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Stats;