
import {
  Satellite,
  ScanSearch,
  BrainCircuit,
  GitCompareArrows,
  ShieldCheck,
  BarChart3,
  ArrowDown,
  ArrowRight,
} from 'lucide-react'

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Satellite,
      label: 'INPUT',
      title: 'Satellite Imagery',
      description:
        'Satellite images of the same study region are collected for two different dates.',
    },
    {
      number: '02',
      icon: ScanSearch,
      label: 'PROCESS',
      title: 'Image Processing',
      description:
        'Images are prepared, aligned and processed so both time periods can be compared accurately.',
    },
    {
      number: '03',
      icon: BrainCircuit,
      label: 'AI / ML',
      title: 'Land-Cover Classification',
      description:
        'AI models classify the landscape into vegetation, water, agriculture, built-up and barren land.',
    },
    {
      number: '04',
      icon: GitCompareArrows,
      label: 'ANALYSIS',
      title: 'Change Detection',
      description:
        'The classified images are compared to identify meaningful land-cover changes between dates.',
    },
    {
      number: '05',
      icon: ShieldCheck,
      label: 'GIS',
      title: 'Protected-Zone Check',
      description:
        'Spatial analysis determines whether detected changes overlap with protected environmental zones.',
    },
    {
      number: '06',
      icon: BarChart3,
      label: 'OUTPUT',
      title: 'Insights & Statistics',
      description:
        'Results are presented through interactive maps, statistics and environmental alerts.',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-[#263B50] bg-[#071426] px-6 py-28"
    >
      {/* Cartographic background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,167,160,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,167,160,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Technical labels */}
      <span className="pointer-events-none absolute left-8 top-20 hidden text-[9px] tracking-[0.25em] text-[#60758B] lg:block">
        GEO / PIPELINE_01
      </span>

      <span className="pointer-events-none absolute right-8 top-20 hidden text-[9px] tracking-[0.25em] text-[#60758B] lg:block">
        BHUNETRA / SYSTEM
      </span>

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-[#F2B84B]" />

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2B84B]">
              The BhuNetra Pipeline
            </p>
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-[#EAF0F6] sm:text-5xl">
            From satellite imagery
            <span className="text-[#F2B84B]">
              {' '}to insight.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#A9BCD0] sm:text-lg">
            BhuNetra combines Artificial Intelligence, Computer Vision
            and Geographic Information Systems to transform satellite
            observations into measurable environmental intelligence.
          </p>
        </div>

        {/* Pipeline */}
        <div className="mt-16">
          {/* Row 1: 01 → 02 → 03 */}
          <div className="grid lg:grid-cols-3">
            {steps.slice(0, 3).map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="relative border-l border-t border-[#263B50] lg:border-r"
                >
                  <PipelineCard step={step} Icon={Icon} />

                  {index < 2 && (
                    <div className="absolute -right-3 top-1/2 z-20 hidden h-6 w-6 -translate-y-1/2 items-center justify-center border border-[#F2B84B]/40 bg-[#071426] lg:flex">
                      <ArrowRight className="h-3.5 w-3.5 text-[#F2B84B]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Processing flow connector */}
          <div className="hidden h-16 items-center justify-end pr-[32%] lg:flex">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#8296AA]">
                Processing flow
              </span>

              <ArrowDown className="h-4 w-4 text-[#F2B84B]" />
            </div>
          </div>

          {/* Row 2: 04 → 05 → 06 */}
          <div className="grid lg:grid-cols-3">
            {steps.slice(3, 6).map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="relative border-l border-t border-[#263B50] lg:border-r"
                >
                  <PipelineCard step={step} Icon={Icon} />

                  {index < 2 && (
                    <div className="absolute -right-3 top-1/2 z-20 hidden h-6 w-6 items-center justify-center border border-[#F2B84B]/40 bg-[#071426] lg:flex">
                      <ArrowRight className="h-3.5 w-3.5 text-[#F2B84B]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* System output */}
          <div className="mt-14 flex flex-col justify-between gap-6 border border-[#263B50] bg-[#0D1C2B] p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                System Output
              </p>

              <p className="mt-2 text-sm text-[#A9BCD0]">
                Satellite imagery → AI classification → change detection → GIS analysis
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#F2B84B]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9AADC0]">
                Environmental intelligence
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Pipeline card */
function PipelineCard({ step, Icon }) {
  return (
    <div className="group relative min-h-[270px] overflow-hidden bg-[#0D1C2B] p-7 transition-colors duration-300 hover:bg-[#142A40]">
      {/* Step number */}
      <div className="absolute right-6 top-6">
        <span className="text-4xl font-semibold tracking-tight text-[#263B50] transition-colors group-hover:text-[#3A5066]">
          {step.number}
        </span>
      </div>

      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center border border-[#F2B84B]/25 bg-[#F2B84B]/10 transition-colors duration-300 group-hover:border-[#F2B84B]/50 group-hover:bg-[#F2B84B]/15">
        <Icon className="h-5 w-5 text-[#F2B84B]" />
      </div>

      {/* Category */}
      <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
        {step.label}
      </p>

      {/* Title */}
      <h3 className="mt-3 max-w-[260px] text-xl font-semibold leading-tight text-[#EAF0F6]">
        {step.title}
      </h3>

      {/* Description */}
      <p className="mt-4 max-w-sm text-sm leading-6 text-[#9AADC0]">
        {step.description}
      </p>

      {/* Bottom technical line */}
      <div className="absolute bottom-0 left-7 right-7 h-px bg-white/5 transition-colors group-hover:bg-[#F2B84B]/40" />
    </div>
  )
}

export default HowItWorks
