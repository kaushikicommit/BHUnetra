
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Layers3,
  MapPin,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const transitionData = [
  { name: 'Vegetation → Built-up', area: 18.4 },
  { name: 'Agriculture → Barren', area: 12.6 },
  { name: 'Vegetation → Barren', area: 7.2 },
  { name: 'Water → Vegetation', area: 3.8 },
]

function formatDate(date) {
  if (!date) return 'Not selected'

  const [year, month, day] = date.split('-').map(Number)
  const parsedDate = new Date(year, month - 1, day)

  return parsedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function Results() {
  const navigate = useNavigate()
  const location = useLocation()

  const selected = location.state || {
    region: 'Jaipur Study Area',
    startDate: '2024-06-12',
    endDate: '2025-06-12',
    isDemo: true,
  }

  const demoResults = {
    region: selected.region || 'Jaipur Study Area',
    firstDate: formatDate(selected.startDate || '2024-06-12'),
    secondDate: formatDate(selected.endDate || '2025-06-12'),
    changedArea: '42.0 ha',
    transitions: '4',
    protectedAlerts: '2',
  }

  return (
    <main className="min-h-screen bg-[#071426] text-[#EAF0F6]">
      <header className="border-b border-[#263B50] bg-[#071426]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Bhu<span className="text-[#F2B84B]">Netra</span>
            <span className="ml-3 hidden text-xs font-normal uppercase tracking-[0.2em] text-[#8296AA] sm:inline">
              Analysis Results
            </span>
          </Link>

          <button
            onClick={() => navigate('/analysis')}
            className="flex items-center gap-2 text-sm text-[#A9BCD0] transition hover:text-[#F2B84B]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Analysis</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 flex items-start gap-3 border border-[#F2B84B]/30 bg-[#F2B84B]/[0.06] p-4">
          <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#F2B84B]" />
          <div>
            <p className="text-sm font-semibold text-[#F2B84B]">
              Demonstration results
            </p>
            <p className="mt-1 text-xs leading-5 text-[#A9BCD0]">
              The selected region and dates below come from your Analysis
              configuration. The statistics, chart, visual comparison and
              alert examples are illustrative, not actual satellite analysis.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
              <span className="h-px w-8 bg-[#F2B84B]" />
              Environmental Intelligence
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Analysis <span className="text-[#F2B84B]">results.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A9BCD0]">
              Review the example land-cover transitions, changed-area
              statistics and protected-zone assessment for your selected
              study configuration.
            </p>
          </div>

          <button
            onClick={() => navigate('/analysis')}
            className="flex shrink-0 items-center justify-center gap-2 bg-[#F2B84B] px-5 py-3 text-sm font-semibold text-[#071426] transition hover:bg-[#FFD071]"
          >
            New Analysis
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <section className="mt-8 grid gap-4 border border-[#263B50] bg-[#0D1C2B] p-5 sm:grid-cols-3 sm:p-6">
          <SummaryItem
            icon={<MapPin className="h-4 w-4 text-[#F2B84B]" />}
            label="Study region"
            value={demoResults.region}
          />
          <SummaryItem
            icon={<CalendarDays className="h-4 w-4 text-[#F2B84B]" />}
            label="First observation"
            value={demoResults.firstDate}
          />
          <SummaryItem
            icon={<CalendarDays className="h-4 w-4 text-[#F2B84B]" />}
            label="Second observation"
            value={demoResults.secondDate}
          />
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Illustrative changed area"
            value={demoResults.changedArea}
            detail="Across example transitions"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            label="Sample transitions"
            value={demoResults.transitions}
            detail="Example transition types"
            icon={<Layers3 className="h-5 w-5" />}
          />
          <MetricCard
            label="Sample zone alerts"
            value={demoResults.protectedAlerts}
            detail="Illustrative overlap flags"
            icon={<ShieldAlert className="h-5 w-5" />}
          />
          <MetricCard
            label="Workflow status"
            value="Demo"
            detail="Backend not connected"
            icon={<Clock3 className="h-5 w-5" />}
          />
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Temporal comparison"
            title="Observe the landscape"
            description="Placeholder visuals for the two-date imagery comparison. Actual satellite images will come from the data pipeline."
          />

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <ImagePlaceholder
              label="First observation"
              date={demoResults.firstDate}
              variant="before"
            />
            <ImagePlaceholder
              label="Second observation"
              date={demoResults.secondDate}
              variant="after"
            />
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="border border-[#263B50] bg-[#0D1C2B] p-5 sm:p-7">
            <SectionHeading
              eyebrow="Change detection"
              title="Land-cover transitions"
              description="Illustrative changed area by transition type, in hectares."
            />

            <div className="mt-7 h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transitionData}
                  layout="vertical"
                  margin={{ top: 4, right: 12, left: 8, bottom: 4 }}
                >
                  <CartesianGrid
                    stroke="#263B50"
                    strokeDasharray="3 3"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: '#8296AA', fontSize: 11 }}
                    axisLine={{ stroke: '#263B50' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={145}
                    tick={{ fill: '#A9BCD0', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#263B50', opacity: 0.4 }}
                    contentStyle={{
                      background: '#102338',
                      border: '1px solid #293F55',
                      color: '#EAF0F6',
                      fontSize: 12,
                    }}
                    formatter={(value) => [`${value} ha`, 'Sample area']}
                  />
                  <Bar
                    dataKey="area"
                    fill="#F2B84B"
                    radius={[0, 3, 3, 0]}
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-[#263B50] bg-[#0D1C2B] p-5 sm:p-7">
            <SectionHeading
              eyebrow="Spatial assessment"
              title="Protected-zone check"
              description="Example layout for reporting spatial overlap."
            />

            <div className="mt-6 border border-[#293F55] bg-[#071426] p-5">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0 text-[#F2B84B]" />
                <div>
                  <p className="text-sm font-semibold">
                    Sample overlap flags
                  </p>
                  <p className="mt-2 text-xs leading-6 text-[#A9BCD0]">
                    These example flags are not derived from a real spatial
                    intersection. Actual alerts will depend on the backend
                    analysis of detected changes and protected-zone boundaries.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <AlertRow
                  title="Sample overlap A"
                  subtitle="Illustrative spatial flag"
                />
                <AlertRow
                  title="Sample overlap B"
                  subtitle="Illustrative spatial flag"
                />
              </div>
            </div>

            <p className="mt-5 border-t border-[#263B50] pt-4 text-xs leading-5 text-[#8296AA]">
              Alert status will be populated from actual spatial analysis
              after backend integration.
            </p>
          </div>
        </section>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#263B50] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-5 text-[#8296AA]">
            BhuNetra · AI-Powered Environmental Intelligence Platform
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#A9BCD0] transition hover:text-[#F2B84B]"
          >
            Return to homepage
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}

function SummaryItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-[#8296AA]">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-[#EAF0F6]">
          {value}
        </p>
      </div>
    </div>
  )
}

function MetricCard({ label, value, detail, icon }) {
  return (
    <div className="border border-[#263B50] bg-[#0D1C2B] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-[#A9BCD0]">{label}</p>
        <span className="text-[#F2B84B]">{icon}</span>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-[#8296AA]">{detail}</p>
    </div>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2B84B]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-xs leading-6 text-[#8296AA]">{description}</p>
    </div>
  )
}

function ImagePlaceholder({ label, date, variant }) {
  return (
    <div className="border border-[#263B50] bg-[#0D1C2B] p-3 sm:p-4">
      <div
        className={`relative h-56 overflow-hidden border border-[#293F55] sm:h-72 ${
          variant === 'before' ? 'bg-[#20382F]' : 'bg-[#263746]'
        }`}
      >
        <div
          className={`absolute left-[8%] top-[10%] h-[35%] w-[34%] rotate-12 ${
            variant === 'before' ? 'bg-[#486B58]' : 'bg-[#526D5C]'
          }`}
        />
        <div
          className={`absolute right-[8%] top-[8%] h-[42%] w-[38%] rounded-[45%] ${
            variant === 'before' ? 'bg-[#667653]' : 'bg-[#B38E51]'
          }`}
        />
        <div className="absolute bottom-[12%] left-[10%] h-[22%] w-[70%] -rotate-6 bg-[#9A8050]/80" />
        <div className="absolute left-0 top-1/3 h-px w-full bg-white/15" />
        <div className="absolute left-1/3 top-0 h-full w-px bg-white/15" />

        <div className="absolute bottom-3 left-3 border border-white/20 bg-[#071426]/80 px-3 py-2 text-[9px] uppercase tracking-[0.15em] text-white">
          Illustrative visual · Not satellite data
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-4">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[#A9BCD0]">{date}</p>
      </div>
    </div>
  )
}

function AlertRow({ title, subtitle }) {
  return (
    <div className="flex items-start gap-3 border border-[#293F55] p-3">
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F2B84B]" />
      <div>
        <p className="text-xs font-medium text-[#EAF0F6]">{title}</p>
        <p className="mt-1 text-[10px] text-[#8296AA]">{subtitle}</p>
      </div>
    </div>
  )
}

export default Results
