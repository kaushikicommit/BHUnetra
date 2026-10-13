
import {
  AlertTriangle,
  CheckCircle2,
  Layers3,
  Map,
  ShieldCheck,
  TreePine,
} from 'lucide-react'

function ProtectedZoneAnalysis() {
  return (
    <section className="relative overflow-hidden border-t border-[#293B50] bg-[#0D1C2B] px-6 py-24 sm:py-28">
      {/* Background grid */}
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
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[#F2B84B]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2B84B]">
                Protected-Zone Analysis
              </p>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-[#EAF0F6] sm:text-5xl">
              Know when change
              <span className="text-[#F2B84B]">
                {' '}intersects protected land.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#A9BCD0] sm:text-lg">
              BhuNetra uses spatial analysis to determine whether detected
              land-cover changes overlap with protected environmental zones.
            </p>
          </div>

          {/* Technical label */}
          <div className="shrink-0 border border-[#293B50] bg-[#071426] px-6 py-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
              Spatial Analysis
            </p>

            <div className="mt-3 flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-[#F2B84B]" />

              <div>
                <p className="text-sm font-medium text-[#EAF0F6]">
                  Geometry Intersection
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#8296AA]">
                  Protected-zone check
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GIS map panel */}
        <div className="mt-14 border border-[#293B50] bg-[#071426]">
          {/* Map header */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#293B50] px-6 py-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Map className="h-4 w-4 text-[#F2B84B]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAF0F6]">
                Spatial Relationship
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.18em] text-[#8296AA]">
              <span>Protected Zone: Forest Reserve</span>
              <span className="hidden h-3 w-px bg-[#293B50] sm:block" />
              <span>Analysis: BN-001</span>
            </div>
          </div>

          {/* Illustrative GIS map */}
          <div className="relative h-[420px] overflow-hidden bg-[#14283A]">
            {/* Map grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(169,188,208,0.22) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(169,188,208,0.22) 1px, transparent 1px)
                `,
                backgroundSize: '55px 55px',
              }}
            />

            {/* Base terrain */}
            <div className="absolute inset-0 bg-[#14283A]" />

            <div className="absolute -left-16 top-10 h-72 w-[520px] rotate-[-8deg] rounded-[48%] bg-[#1D3A3C]" />

            <div className="absolute right-[-100px] top-[-50px] h-80 w-[500px] rotate-[15deg] rounded-[50%] bg-[#254345]" />

            <div className="absolute bottom-[-100px] left-[25%] h-72 w-[620px] rotate-[7deg] rounded-[50%] bg-[#183238]" />

            {/* Water body */}
            <div className="absolute bottom-[12%] left-[5%] h-24 w-[330px] rotate-[12deg] rounded-[50%] bg-[#24566E]/80" />

            <div className="absolute bottom-[17%] left-[10%] h-px w-[270px] rotate-[12deg] bg-[#6BA6B7]/60" />

            {/* Protected zone */}
            <div className="absolute left-[17%] top-[17%] h-[220px] w-[370px] rotate-[-8deg] border-2 border-[#F2B84B]/80 bg-[#F2B84B]/10">
              <div className="absolute inset-5 border border-dashed border-[#F2B84B]/60" />

              <div className="absolute left-5 top-5 flex items-center gap-2 border border-[#F2B84B]/40 bg-[#071426]/95 px-3 py-2 backdrop-blur-sm">
                <TreePine className="h-3.5 w-3.5 text-[#F2B84B]" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#EAF0F6]">
                  Protected Zone
                </span>
              </div>
            </div>

            {/* Detected change */}
            <div className="absolute bottom-[16%] right-[17%] h-[150px] w-[260px] rotate-[8deg] border-2 border-[#91A9BF] bg-[#91A9BF]/15">
              <div className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-[#91A9BF]" />

              <div className="absolute -bottom-1 -left-1 h-2.5 w-2.5 bg-[#91A9BF]" />

              <div className="absolute bottom-4 right-4 border border-[#91A9BF]/40 bg-[#071426]/95 px-3 py-2">
                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#DCE5ED]">
                  Detected Change
                </span>
              </div>
            </div>

            {/* Overlap area */}
            <div className="absolute left-[48%] top-[43%] h-[90px] w-[125px] rotate-[2deg] border-2 border-[#F2B84B] bg-[#F2B84B]/35">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap border border-[#F2B84B]/50 bg-[#071426]/95 px-3 py-1.5">
                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFD071]">
                  Spatial Overlap
                </span>
              </div>
            </div>

            {/* Coordinates */}
            <span className="absolute left-5 top-5 text-[8px] tracking-[0.2em] text-[#DCE5ED]/70">
              26°55′ N
            </span>

            <span className="absolute bottom-5 right-5 text-[8px] tracking-[0.2em] text-[#DCE5ED]/70">
              75°47′ E
            </span>

            {/* Scale */}
            <div className="absolute bottom-5 left-5 flex items-end gap-2">
              <div className="flex flex-col gap-1">
                <div className="h-px w-20 bg-[#A9BCD0]" />

                <div className="flex justify-between text-[7px] text-[#A9BCD0]">
                  <span>0</span>
                  <span>2 km</span>
                </div>
              </div>
            </div>

            {/* Demo badge */}
            <div className="absolute right-5 top-5 border border-[#293B50] bg-[#071426]/90 px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F2B84B]" />

                <span className="text-[8px] uppercase tracking-[0.15em] text-[#A9BCD0]">
                  Demo spatial analysis
                </span>
              </div>
            </div>
          </div>

          {/* Analysis results */}
          <div className="grid border-t border-[#293B50] lg:grid-cols-3">
            {/* Protected zone */}
            <div className="border-b border-[#293B50] p-6 lg:border-b-0 lg:border-r">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                Protected Zone
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-[#F2B84B]/30 bg-[#F2B84B]/10">
                  <TreePine className="h-4 w-4 text-[#F2B84B]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#EAF0F6]">
                    Forest Reserve
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#8296AA]">
                    Environmental zone
                  </p>
                </div>
              </div>
            </div>

            {/* Changed area */}
            <div className="border-b border-[#293B50] p-6 lg:border-b-0 lg:border-r">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                Changed Area
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-semibold text-[#EAF0F6]">
                  18.4
                </span>

                <span className="mb-1 text-sm text-[#A9BCD0]">
                  hectares
                </span>
              </div>
            </div>

            {/* Spatial status */}
            <div className="p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                Spatial Status
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-[#F2B84B]/30 bg-[#F2B84B]/10">
                  <AlertTriangle className="h-4 w-4 text-[#F2B84B]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#EAF0F6]">
                    Overlap detected
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#8296AA]">
                    Requires attention
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation cards */}
        <div className="mt-10 grid gap-px border border-[#293B50] bg-[#293B50] sm:grid-cols-3">
          <InfoBlock
            icon={Layers3}
            label="01 / Overlay"
            text="Protected-zone polygons are placed over detected land-cover changes."
          />

          <InfoBlock
            icon={Map}
            label="02 / Intersection"
            text="Spatial geometry is evaluated to identify whether the areas overlap."
          />

          <InfoBlock
            icon={ShieldCheck}
            label="03 / Alert"
            text="Detected overlap is surfaced as an environmental spatial alert."
          />
        </div>

        {/* Supporting note */}
        <div className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-[#8296AA]">
          <span className="h-px w-8 bg-[#F2B84B]/60" />
          Spatial relationships are evaluated using geographic geometry
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ icon: Icon, label, text }) {
  return (
    <div className="bg-[#071426] p-6 transition-colors duration-300 hover:bg-[#102338]">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-[#F2B84B]" />

        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F2B84B]">
          {label}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#A9BCD0]">
        {text}
      </p>
    </div>
  )
}

export default ProtectedZoneAnalysis
