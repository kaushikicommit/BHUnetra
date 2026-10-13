
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  ChartNoAxesCombined,
  Layers3,
  ShieldAlert,
} from 'lucide-react'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

const landCoverData = [
  { name: 'Vegetation', area: 38, color: '#527D64' },
  { name: 'Water', area: 12, color: '#4386A0' },
  { name: 'Agriculture', area: 26, color: '#B69A60' },
  { name: 'Built-up', area: 16, color: '#F2B84B' },
  { name: 'Barren land', area: 8, color: '#8B8170' },
]

const changeData = [
  { name: 'Veg. → Built-up', area: 18.4 },
  { name: 'Agri. → Built-up', area: 12.6 },
  { name: 'Veg. → Barren', area: 7.2 },
  { name: 'Water → Barren', area: 3.8 },
]

const tooltipStyle = {
  backgroundColor: '#0D1C2B',
  border: '1px solid #293B50',
  borderRadius: '4px',
  color: '#EAF0F6',
}

function ResultsInsights() {
  return (
    <section
      id="insights"
      className="relative border-t border-[#293B50] bg-[#071426] px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[#F2B84B]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2B84B]">
                Results & Environmental Insights
              </p>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-[#EAF0F6] sm:text-5xl">
              Turn detected changes
              <span className="text-[#F2B84B]">
                {' '}into insights.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#A9BCD0] sm:text-lg">
              Explore land-cover distribution, measure changes between
              observation dates and review spatial alerts in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 border border-[#293B50] bg-[#0D1C2B] px-4 py-3">
            <Activity className="h-4 w-4 text-[#F2B84B]" />

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8296AA]">
                Dashboard preview
              </p>

              <p className="mt-1 text-xs text-[#DCE5ED]">
                Sample analysis data
              </p>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={Layers3}
            label="Study Area"
            value="1,240"
            unit="hectares"
            note="Illustrative study region"
          />

          <MetricCard
            icon={ChartNoAxesCombined}
            label="Changed Area"
            value="42.0"
            unit="hectares"
            note="Across detected transitions"
            trend="up"
          />

          <MetricCard
            icon={BarChart3}
            label="Land-cover Classes"
            value="5"
            unit="classes"
            note="Configured classification groups"
          />

          <MetricCard
            icon={ShieldAlert}
            label="Spatial Alerts"
            value="2"
            unit="sample alerts"
            note="Illustrative protected-zone results"
            alert
          />
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          {/* Land-cover distribution */}
          <div className="border border-[#293B50] bg-[#0D1C2B] p-6 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#EAF0F6]">
                  Land-cover distribution
                </p>

                <p className="mt-2 text-xs leading-5 text-[#8296AA]">
                  Illustrative share of the study area
                </p>
              </div>

              <Layers3 className="h-5 w-5 text-[#F2B84B]" />
            </div>

            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={landCoverData}
                    dataKey="area"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {landCoverData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {landCoverData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5"
                      style={{ backgroundColor: item.color }}
                    />

                    <span className="text-xs text-[#A9BCD0]">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-[#EAF0F6]">
                    {item.area}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Change categories */}
          <div className="border border-[#293B50] bg-[#0D1C2B] p-6 lg:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#EAF0F6]">
                  Detected land-cover transitions
                </p>

                <p className="mt-2 text-xs leading-5 text-[#8296AA]">
                  Example changed area by transition, in hectares
                </p>
              </div>

              <BarChart3 className="h-5 w-5 text-[#F2B84B]" />
            </div>

            <div className="mt-8 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={changeData}
                  margin={{ top: 10, right: 8, left: -18, bottom: 10 }}
                >
                  <CartesianGrid
                    stroke="#293B50"
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#A9BCD0', fontSize: 10 }}
                    axisLine={{ stroke: '#293B50' }}
                    tickLine={false}
                    interval={0}
                    angle={-12}
                    textAnchor="end"
                    height={65}
                  />

                  <YAxis
                    tick={{ fill: '#8296AA', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [`${value} ha`, 'Changed area']}
                  />

                  <Bar
                    dataKey="area"
                    name="Changed area"
                    fill="#F2B84B"
                    maxBarSize={48}
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Transition table */}
        <div className="mt-6 border border-[#293B50] bg-[#0D1C2B]">
          <div className="flex flex-col justify-between gap-3 border-b border-[#293B50] px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-[#EAF0F6]">
                Change summary
              </p>

              <p className="mt-1 text-xs text-[#8296AA]">
                Example transitions detected between two dates
              </p>
            </div>

            <span className="w-fit border border-[#293B50] px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#A9BCD0]">
              Demo results
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left">
              <thead>
                <tr className="border-b border-[#293B50] text-[9px] uppercase tracking-[0.18em] text-[#8296AA]">
                  <th className="px-6 py-4 font-medium">Transition</th>
                  <th className="px-6 py-4 font-medium">Changed area</th>
                  <th className="px-6 py-4 font-medium">Observation</th>
                </tr>
              </thead>

              <tbody>
                {changeData.map((item, index) => (
                  <tr
                    key={item.name}
                    className="border-b border-[#293B50]/60 last:border-0 transition-colors hover:bg-[#142A40]"
                  >
                    <td className="px-6 py-4 text-sm text-[#DCE5ED]">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-[#EAF0F6]">
                      {item.area.toFixed(1)} ha
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 text-xs text-[#A9BCD0]">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            index === 0
                              ? 'bg-[#F2B84B]'
                              : 'bg-[#8296AA]'
                          }`}
                        />

                        {index === 0
                          ? 'Example priority transition'
                          : 'Example detected transition'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-[#8296AA]">
          <span className="h-px w-8 bg-[#F2B84B]/60" />
          All figures shown are illustrative and are not measured project results
        </div>
      </div>
    </section>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  note,
  trend,
  alert,
}) {
  return (
    <div className="border border-[#293B50] bg-[#0D1C2B] p-5 transition-colors duration-300 hover:border-[#F2B84B]/40 hover:bg-[#102338]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8296AA]">
          {label}
        </p>

        <Icon
          className={`h-4 w-4 ${
            alert ? 'text-[#F2B84B]' : 'text-[#A9BCD0]'
          }`}
        />
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight text-[#EAF0F6]">
          {value}
        </span>

        <span className="text-xs text-[#8296AA]">{unit}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-[#293B50] pt-4">
        {trend === 'up' ? (
          <ArrowUpRight className="h-3.5 w-3.5 text-[#F2B84B]" />
        ) : (
          <ArrowDownRight
            className={`h-3.5 w-3.5 ${
              alert ? 'text-[#F2B84B]' : 'text-[#8296AA]'
            }`}
          />
        )}

        <p className="text-[10px] text-[#8296AA]">{note}</p>
      </div>
    </div>
  )
}

export default ResultsInsights
