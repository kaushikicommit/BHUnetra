
import {
  ArrowRight,
  CalendarDays,
  GitCompareArrows,
  MapPin,
  ScanSearch,
} from 'lucide-react'

function ChangeDetection() {
  return (
    <section className="relative overflow-hidden border-t border-[#293B50] bg-[#071426] px-6 py-24 sm:py-28">
      {/* Subtle cartographic grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(169,188,208,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(169,188,208,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-[#F2B84B]" />

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2B84B]">
              Multi-Temporal Change Detection
            </p>
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-[#EAF0F6] sm:text-5xl">
            See what changed
            <span className="text-[#F2B84B]">
              {' '}between two dates.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#A9BCD0] sm:text-lg">
            BhuNetra compares classified satellite imagery from two
            different dates to identify land-cover transitions and
            measure the area affected.
          </p>
        </div>

        {/* Comparison panel */}
        <div className="mt-14 border border-[#293B50] bg-[#0D1C2B]">
          {/* Panel header */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#293B50] px-6 py-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <GitCompareArrows className="h-4 w-4 text-[#F2B84B]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DCE5ED]">
                Temporal Comparison
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.18em] text-[#8296AA]">
              <span>Region: Jaipur Study Area</span>
              <span className="hidden h-3 w-px bg-[#293B50] sm:block" />
              <span>Analysis ID: BN-001</span>
            </div>
          </div>

          {/* Before / After images */}
          <div className="grid lg:grid-cols-2">
            {/* BEFORE */}
            <div className="relative border-b border-[#293B50] lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-[#293B50] px-6 py-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F2B84B]">
                    Time Point 01
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-[#8296AA]" />
                    <span className="text-sm font-medium text-[#DCE5ED]">
                      12 June 2024
                    </span>
                  </div>
                </div>

                <span className="border border-[#52677D] px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-[#A9BCD0]">
                  Before
                </span>
              </div>

              <div className="relative m-4 h-[320px] overflow-hidden border border-[#35485B] bg-[#142E36] sm:m-6">
                {/* Illustrative terrain */}
                <div className="absolute inset-0">
                  <div className="absolute -left-10 top-8 h-40 w-72 rotate-[12deg] rounded-[45%] bg-[#32634E]" />
                  <div className="absolute right-[-30px] top-[-20px] h-48 w-64 rotate-[-20deg] rounded-[50%] bg-[#486B58]" />
                  <div className="absolute bottom-[-40px] left-[30%] h-52 w-72 rounded-[50%] bg-[#244A43]" />
                  <div className="absolute left-[10%] top-[48%] h-8 w-[80%] rotate-[-8deg] bg-[#8D895D]/70" />
                  <div className="absolute bottom-[20%] right-[15%] h-16 w-28 rotate-[15deg] bg-[#8B775A]/80" />
                </div>

                <CoordinateGrid />

                <div className="absolute left-4 top-4 flex items-center gap-2 border border-[#52677D] bg-[#071426]/90 px-3 py-2 backdrop-blur-sm">
                  <MapPin className="h-3 w-3 text-[#F2B84B]" />
                  <span className="text-[8px] uppercase tracking-[0.15em] text-[#DCE5ED]">
                    Study Region
                  </span>
                </div>

                <span className="absolute bottom-4 right-4 text-[8px] tracking-[0.2em] text-white/70">
                  26°55′ N · 75°47′ E
                </span>
              </div>
            </div>

            {/* AFTER */}
            <div className="relative">
              <div className="flex items-center justify-between border-b border-[#293B50] px-6 py-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F2B84B]">
                    Time Point 02
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-[#8296AA]" />
                    <span className="text-sm font-medium text-[#DCE5ED]">
                      12 June 2025
                    </span>
                  </div>
                </div>

                <span className="border border-[#F2B84B]/40 bg-[#F2B84B]/10 px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-[#F2B84B]">
                  After
                </span>
              </div>

              <div className="relative m-4 h-[320px] overflow-hidden border border-[#35485B] bg-[#19343C] sm:m-6">
                {/* Illustrative terrain */}
                <div className="absolute inset-0">
                  <div className="absolute -left-10 top-8 h-40 w-72 rotate-[12deg] rounded-[45%] bg-[#32634E]" />
                  <div className="absolute right-[-30px] top-[-20px] h-48 w-64 rotate-[-20deg] rounded-[50%] bg-[#486B58]" />
                  <div className="absolute bottom-[-40px] left-[30%] h-52 w-72 rounded-[50%] bg-[#244A43]" />

                  {/* Illustrative built-up area */}
                  <div className="absolute bottom-[18%] left-[34%] h-24 w-40 rotate-[-8deg] bg-[#A18A5C]" />
                  <div className="absolute bottom-[11%] left-[40%] h-12 w-32 rotate-[5deg] bg-[#777B7A]" />
                  <div className="absolute bottom-[28%] left-[50%] h-8 w-20 bg-[#C0A56D]/70" />
                </div>

                <CoordinateGrid />

                {/* Detected-change highlight */}
                <div className="absolute bottom-[12%] left-[31%] h-28 w-48 border border-[#F2B84B] bg-[#F2B84B]/15">
                  <span className="absolute -right-1 -top-1 h-2 w-2 bg-[#F2B84B]" />
                  <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-[#F2B84B]" />
                  <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#F2B84B]" />
                  <span className="absolute -left-1 -top-1 h-2 w-2 bg-[#F2B84B]" />
                </div>

                <div className="absolute left-4 top-4 flex items-center gap-2 border border-[#F2B84B]/40 bg-[#071426]/90 px-3 py-2 backdrop-blur-sm">
                  <ScanSearch className="h-3 w-3 text-[#F2B84B]" />
                  <span className="text-[8px] uppercase tracking-[0.15em] text-[#EAF0F6]">
                    Change detected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Change statistics */}
          <div className="grid border-t border-[#293B50] lg:grid-cols-3">
            <div className="border-b border-[#293B50] p-6 lg:border-b-0 lg:border-r">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                Detected Transition
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="border border-[#537A65]/40 bg-[#19372F] px-3 py-2 text-xs text-[#C1D2C6]">
                  Vegetation
                </span>

                <ArrowRight className="h-4 w-4 text-[#F2B84B]" />

                <span className="border border-[#C0A56D]/40 bg-[#403C37] px-3 py-2 text-xs text-[#E1C995]">
                  Built-up
                </span>
              </div>
            </div>

            <div className="border-b border-[#293B50] p-6 lg:border-b-0 lg:border-r">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                Changed Area
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-semibold text-[#EAF0F6]">
                  18.4
                </span>
                <span className="mb-1 text-sm text-[#9AADC0]">
                  hectares
                </span>
              </div>
            </div>

            <div className="p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                Detection Status
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#F2B84B]" />
                <span className="text-sm font-medium text-[#DCE5ED]">
                  Significant change detected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting note */}
        <div className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-[#8296AA]">
          <span className="h-px w-8 bg-[#F2B84B]/60" />
          Change statistics are calculated from classified land-cover data
        </div>
      </div>
    </section>
  )
}

function CoordinateGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  )
}

export default ChangeDetection
