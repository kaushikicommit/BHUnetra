
import {
  ArrowUpRight,
  Earth,
  Eye,
  Layers3,
  ShieldCheck,
} from 'lucide-react'

function AboutSection() {
  const principles = [
    {
      icon: Eye,
      number: '01',
      title: 'Observe',
      description:
        'Compare satellite imagery of the same study region across two different dates.',
    },
    {
      icon: Layers3,
      number: '02',
      title: 'Understand',
      description:
        'Use AI-based land-cover classification and change detection to identify landscape transitions.',
    },
    {
      icon: ShieldCheck,
      number: '03',
      title: 'Assess',
      description:
        'Use GIS spatial analysis to check whether detected changes overlap with protected environmental zones.',
    },
  ]

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[#293B50] bg-[#0D1C2B] px-6 py-24 sm:py-28"
    >
      {/* Subtle cartographic grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(169,188,208,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(169,188,208,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[#F2B84B]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2B84B]">
                About BhuNetra
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#EAF0F6] sm:text-5xl">
              Giving the Earth
              <span className="text-[#F2B84B]">
                {' '}a closer look.
              </span>
            </h2>
          </div>

          <div className="lg:pt-10">
            <p className="text-base leading-8 text-[#A9BCD0] sm:text-lg">
              BhuNetra is an AI-powered environmental intelligence platform
              that compares satellite images captured at different times
              to identify land-cover changes and measure their extent.
            </p>

            <p className="mt-5 text-base leading-8 text-[#A9BCD0]">
              By combining Computer Vision, Machine Learning and
              Geographic Information Systems, the platform also examines
              whether detected changes overlap with protected environmental
              zones, presenting the findings through maps, statistics and alerts.
            </p>
          </div>
        </div>

        {/* Project identity panel */}
        <div className="mt-16 grid border border-[#293B50] bg-[#071426] lg:grid-cols-[1.1fr_0.9fr]">
          {/* Name and identity */}
          <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden border-b border-[#293B50] p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 rounded-full border border-[#F2B84B]/15"
            >
              <div className="absolute inset-8 rounded-full border border-[#F2B84B]/15" />
              <div className="absolute inset-16 rounded-full border border-[#F2B84B]/15" />
            </div>

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center border border-[#F2B84B]/30 bg-[#F2B84B]/10">
                <Earth className="h-6 w-6 text-[#F2B84B]" />
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                The idea behind the name
              </p>

              <h3 className="mt-4 text-3xl font-semibold text-[#EAF0F6]">
                BhuNetra
              </h3>

              <p className="mt-3 max-w-md text-sm leading-7 text-[#A9BCD0]">
                Derived from “Bhu”, meaning Earth, and “Netra”, meaning
                eye. The name reflects the platform's goal of observing
                and understanding how landscapes change over time.
              </p>
            </div>

            <div className="relative mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#8296AA]">
              <span className="h-px w-8 bg-[#F2B84B]/60" />
              Earth Intelligence
            </div>
          </div>

          {/* Core approach */}
          <div className="p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
              Our approach
            </p>

            <div className="mt-6 divide-y divide-[#293B50]">
              {principles.map((principle) => {
                const Icon = principle.icon

                return (
                  <div
                    key={principle.number}
                    className="group flex gap-5 py-6 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#293B50] bg-[#0D1C2B] transition-colors group-hover:border-[#F2B84B]/40 group-hover:bg-[#142A40]">
                      <Icon className="h-5 w-5 text-[#F2B84B]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] tracking-[0.15em] text-[#8296AA]">
                          {principle.number}
                        </span>

                        <h3 className="text-base font-semibold text-[#EAF0F6]">
                          {principle.title}
                        </h3>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-[#A9BCD0]">
                        {principle.description}
                      </p>
                    </div>

                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#8296AA] transition-colors group-hover:text-[#F2B84B]" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-10 flex flex-col justify-between gap-4 border border-[#293B50] bg-[#071426]/60 px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <p className="max-w-2xl text-sm leading-6 text-[#A9BCD0]">
            From satellite observations to measurable land-cover change,
            BhuNetra brings imagery, AI and spatial analysis into one workflow.
          </p>

          <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F2B84B]">
            Observe · Analyse · Understand
          </span>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
