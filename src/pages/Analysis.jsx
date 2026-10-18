
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { getApiError } from '../services/api'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Layers3,
  MapPin,
  Satellite,
  LoaderCircle,
  AlertCircle,
} from 'lucide-react'

const defaultRegions = [
  'Jaipur Study Area',
  'Sambhar Lake Region',
  'Ranthambore Study Area',
]

function Analysis() {
  const navigate = useNavigate()

  const [regions, setRegions] = useState(defaultRegions)
  const [region, setRegion] = useState(defaultRegions[0])

  useEffect(() => {
    api
      .get('/regions')
      .then(({ data }) => {
        const items = Array.isArray(data)
          ? data
          : (data.features || []).map((feature) => feature.properties)
        const names = items.map((item) => item && item.name).filter(Boolean)
        if (names.length) setRegions(names)
      })
      .catch(() => {})
  }, [])
  const [startDate, setStartDate] = useState('2024-06-12')
  const [endDate, setEndDate] = useState('2025-06-12')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setSubmitted(false)

    if (!region) {
      setMessage('Please select a study region.')
      return
    }

    if (!startDate || !endDate) {
      setMessage('Please select both observation dates.')
      return
    }

    if (startDate >= endDate) {
      setMessage('The second date must be later than the first date.')
      return
    }

    setIsSubmitting(true)

    try {
      const { data } = await api.post('/analysis', {
        region,
        start_date: startDate,
        end_date: endDate,
      })

      navigate('/results', {
        state: { region, startDate, endDate, result: data, isDemo: false },
      })
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  function resetConfiguration() {
    setRegion(regions[0])
    setStartDate('2024-06-12')
    setEndDate('2025-06-12')
    setMessage('')
    setSubmitted(false)
    setIsSubmitting(false)
  }

  function updateField(update) {
    update()
    setSubmitted(false)
    setMessage('')
  }

  function viewDemoResults() {
    navigate('/results', {
      state: {
        region,
        startDate,
        endDate,
        isDemo: true,
      },
    })
  }

  return (
    <main className="min-h-screen bg-[#071426] text-[#EAF0F6]">
      <header className="sticky top-0 z-50 border-b border-[#263B50] bg-[#071426]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border border-[#F2B84B]/40 bg-[#F2B84B]/10">
              <Satellite className="h-5 w-5 text-[#F2B84B]" />
            </div>

            <div>
              <p className="text-xl font-bold tracking-tight">
                Bhu<span className="text-[#F2B84B]">Netra</span>
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8296AA]">
                Earth Intelligence
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-[#A9BCD0] transition hover:text-[#F2B84B]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 py-14 sm:px-6 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(169,188,208,0.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(169,188,208,0.45) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[#F2B84B]" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2B84B]">
                Analysis Workspace / 01
              </p>
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Start a new
              <span className="text-[#F2B84B]"> analysis.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#A9BCD0] sm:text-lg">
              Select a study region and two observation dates to prepare
              a land-cover change analysis with BhuNetra.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border border-[#263B50] bg-[#0D1C2B]">
              <div className="flex items-center justify-between gap-4 border-b border-[#263B50] px-5 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                  <Layers3 className="h-5 w-5 text-[#F2B84B]" />
                  <h2 className="text-base font-semibold">
                    Analysis configuration
                  </h2>
                </div>

                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8296AA]">
                  Required fields
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-8">
                <div>
                  <label
                    htmlFor="region"
                    className="mb-3 block text-xs font-semibold uppercase tracking-[0.16em] text-[#D6E1EC]"
                  >
                    <span className="mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#F2B84B]" />
                      Study region
                    </span>
                  </label>

                  <div className="relative">
                    <select
                      id="region"
                      required
                      disabled={isSubmitting}
                      value={region}
                      onChange={(event) =>
                        updateField(() => setRegion(event.target.value))
                      }
                      className="w-full appearance-none border border-[#293F55] bg-[#071426] px-4 py-4 pr-10 text-sm text-[#EAF0F6] outline-none transition focus:border-[#F2B84B] focus:ring-1 focus:ring-[#F2B84B]/20 disabled:opacity-60"
                    >
                      {regions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8296AA]" />
                  </div>

                  <p className="mt-2 text-xs leading-5 text-[#8296AA]">
                    Demonstration region options. Dataset coverage will be
                    confirmed during backend integration.
                  </p>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#F2B84B]" />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6E1EC]">
                      Observation period
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="startDate"
                        className="mb-2 block text-xs text-[#A9BCD0]"
                      >
                        First observation
                      </label>

                      <input
                        id="startDate"
                        type="date"
                        required
                        disabled={isSubmitting}
                        value={startDate}
                        max={endDate || undefined}
                        onChange={(event) =>
                          updateField(() => setStartDate(event.target.value))
                        }
                        className="w-full border border-[#293F55] bg-[#071426] px-3 py-4 text-sm text-[#EAF0F6] outline-none [color-scheme:dark] focus:border-[#F2B84B] focus:ring-1 focus:ring-[#F2B84B]/20 disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="endDate"
                        className="mb-2 block text-xs text-[#A9BCD0]"
                      >
                        Second observation
                      </label>

                      <input
                        id="endDate"
                        type="date"
                        required
                        disabled={isSubmitting}
                        value={endDate}
                        min={startDate || undefined}
                        onChange={(event) =>
                          updateField(() => setEndDate(event.target.value))
                        }
                        className="w-full border border-[#293F55] bg-[#071426] px-3 py-4 text-sm text-[#EAF0F6] outline-none [color-scheme:dark] focus:border-[#F2B84B] focus:ring-1 focus:ring-[#F2B84B]/20 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#8296AA]">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#F2B84B]" />
                    Choose dates for the same study region. Suitable satellite
                    imagery must be available for both dates.
                  </div>
                </div>

                {message && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-3 bg-[#F2B84B] px-6 py-4 font-semibold text-[#071426] transition hover:bg-[#FFD071] focus:outline-none focus:ring-2 focus:ring-[#F2B84B] focus:ring-offset-2 focus:ring-offset-[#0D1C2B] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Running analysis...
                    </>
                  ) : (
                    <>
                      Run Analysis
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] leading-5 text-[#8296AA]">
                    Results are read from the BhuNetra backend. Live satellite processing is not part of this version.
                  </p>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={resetConfiguration}
                    className="shrink-0 text-xs font-medium text-[#A9BCD0] underline decoration-[#8296AA]/50 underline-offset-4 transition hover:text-[#F2B84B] disabled:opacity-50"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            <aside className="space-y-6">
              <div className="border border-[#263B50] bg-[#0D1C2B] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2B84B]">
                  Request overview
                </p>

                <h2 className="mt-4 text-xl font-semibold">
                  Your analysis setup
                </h2>

                <div className="mt-6 divide-y divide-[#263B50]">
                  <SummaryRow label="Study region" value={region} />
                  <SummaryRow label="First date" value={startDate} />
                  <SummaryRow label="Second date" value={endDate} />
                </div>

                <div className="mt-6 flex items-center gap-2 border border-[#F2B84B]/20 bg-[#F2B84B]/5 px-3 py-3">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      submitted ? 'bg-[#F2B84B]' : 'bg-[#8296AA]'
                    }`}
                  />

                  <p className="text-xs text-[#D6E1EC]">
                    {isSubmitting
                      ? 'Validating selections...'
                      : submitted
                        ? 'Configuration validated (demo)'
                        : 'Awaiting configuration'}
                  </p>
                </div>
              </div>

              <div className="border border-[#263B50] bg-[#0D1C2B] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2B84B]">
                  Processing pipeline
                </p>

                <h2 className="mt-4 text-xl font-semibold">
                  From imagery to insight
                </h2>

                <div className="mt-6 space-y-5">
                  <PipelineStep
                    number="01"
                    title="Image preparation"
                    description="Prepare and align both observations."
                  />
                  <PipelineStep
                    number="02"
                    title="Land-cover analysis"
                    description="Classify the landscape and detect changes."
                  />
                  <PipelineStep
                    number="03"
                    title="Spatial assessment"
                    description="Check detected changes against protected zones."
                  />
                </div>

                <p className="mt-6 border-t border-[#263B50] pt-4 text-xs leading-5 text-[#8296AA]">
                  These are planned pipeline steps. Processing has not run.
                </p>
              </div>

              <div className="flex items-start gap-3 border border-[#263B50] bg-[#0D1C2B]/60 p-5">
                <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-[#F2B84B]" />
                <p className="text-xs leading-6 text-[#8296AA]">
                  Use a demonstration option for now. Final region choices
                  will depend on the satellite dataset your team uses.
                </p>
              </div>
            </aside>
          </div>

          {submitted && (
            <div
              role="status"
              className="mt-8 border border-[#F2B84B]/30 bg-[#F2B84B]/[0.05] p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[#F2B84B]" />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#EAF0F6]">
                    Configuration validated
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#A9BCD0]">
                    Your selections passed frontend validation. This is a
                    demonstration confirmation only. No API request or
                    satellite processing has occurred because the backend
                    is not connected yet.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#D6E1EC]">
                    <span className="border border-[#293F55] bg-[#0D1C2B] px-3 py-2">
                      {region}
                    </span>
                    <span className="border border-[#293F55] bg-[#0D1C2B] px-3 py-2">
                      {startDate} → {endDate}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={viewDemoResults}
                    className="mt-5 flex items-center gap-3 bg-[#F2B84B] px-5 py-3 font-semibold text-[#071426] transition hover:bg-[#FFD071]"
                  >
                    View Demo Results
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[#8296AA] transition hover:text-[#F2B84B]"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to the BhuNetra homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <span className="text-xs text-[#8296AA]">{label}</span>
      <span className="max-w-[65%] break-words text-right text-xs font-medium text-[#D6E1EC]">
        {value}
      </span>
    </div>
  )
}

function PipelineStep({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#F2B84B]/25 bg-[#F2B84B]/[0.06] text-xs font-semibold text-[#F2B84B]">
        {number}
      </div>
      <div>
        <h3 className="text-sm font-medium text-[#D6E1EC]">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-[#8296AA]">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Analysis
