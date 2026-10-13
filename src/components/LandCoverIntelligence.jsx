
import {
  Building2,
  Droplets,
  Leaf,
  Sprout,
  Mountain,
} from 'lucide-react'

const colors = {
  bg: '#071426',
  surface: '#0D1C2B',
  card: '#102338',
  border: '#293B50',
  amber: '#F2B84B',
  text: '#EAF0F6',
  muted: '#A9BCD0',
  subtle: '#8296AA',
}

function LandCoverIntelligence() {
  const classes = [
    {
      number: '01',
      icon: Leaf,
      title: 'Vegetation',
      description:
        'Forests, natural vegetation and other green land-cover areas.',
      area: 'FOREST / GREEN COVER',
      visual: 'vegetation',
    },
    {
      number: '02',
      icon: Droplets,
      title: 'Water',
      description:
        'Rivers, lakes, reservoirs and other visible water bodies.',
      area: 'RIVERS / LAKES',
      visual: 'water',
    },
    {
      number: '03',
      icon: Sprout,
      title: 'Agriculture',
      description:
        'Cultivated and agricultural areas identified across the study region.',
      area: 'CROPLAND / FIELDS',
      visual: 'agriculture',
    },
    {
      number: '04',
      icon: Building2,
      title: 'Built-up',
      description:
        'Urban and developed surfaces representing human-built areas.',
      area: 'URBAN / DEVELOPED',
      visual: 'builtup',
    },
    {
      number: '05',
      icon: Mountain,
      title: 'Barren Land',
      description:
        'Exposed soil, rocky terrain and other areas with limited vegetation.',
      area: 'SOIL / ROCK',
      visual: 'barren',
    },
  ]

  return (
    <section
      id="explore"
      className="relative overflow-hidden border-t border-[#293B50] bg-[#0D1C2B] px-6 py-24 sm:py-28"
    >
      {/* Subtle technical grid */}
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
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[#F2B84B]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2B84B]">
                Land-Cover Intelligence
              </p>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-[#EAF0F6] sm:text-5xl">
              Understand what changed
              <span className="text-[#F2B84B]">
                {' '}across the landscape.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#A9BCD0] sm:text-lg">
              BhuNetra classifies the study region into five land-cover
              categories before comparing how those categories change
              between two points in time.
            </p>
          </div>

          {/* Classification summary */}
          <div className="shrink-0 border border-[#293B50] bg-[#071426] px-6 py-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
              Classification Model
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-3xl font-semibold text-[#EAF0F6]">
                05
              </span>

              <div>
                <p className="text-sm font-medium text-[#DCE5ED]">
                  Land-cover classes
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#8296AA]">
                  Multi-class analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Land-cover cards */}
        <div className="mt-14 grid gap-px border border-[#293B50] bg-[#293B50] md:grid-cols-2 lg:grid-cols-6">
          {classes.map((item, index) => (
            <LandCoverCard
              key={item.number}
              item={item}
              featured={index === 0}
            />
          ))}
        </div>

        {/* Analysis pipeline footer */}
        <div className="mt-8 grid gap-px border border-[#293B50] bg-[#293B50] sm:grid-cols-3">
          {[
            {
              label: 'Input',
              value: 'Multi-temporal satellite imagery',
              number: '01',
            },
            {
              label: 'Classification',
              value: 'AI / ML land-cover mapping',
              number: '02',
            },
            {
              label: 'Output',
              value: 'Class-level change statistics',
              number: '03',
            },
          ].map((item) => (
            <div
              key={item.number}
              className="group relative bg-[#071426] p-6 transition-colors duration-300 hover:bg-[#102338]"
            >
              <span className="absolute right-5 top-5 text-xs text-[#50657C]">
                {item.number}
              </span>

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F2B84B]">
                {item.label}
              </p>

              <p className="mt-3 pr-5 text-sm font-medium leading-6 text-[#DCE5ED]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandCoverCard({ item, featured }) {
  const Icon = item.icon

  return (
    <article
      className={`group relative min-h-[330px] overflow-hidden bg-[#0D1C2B] p-5 transition-colors duration-300 hover:bg-[#142A40] sm:p-6 ${
        featured ? 'lg:col-span-2' : 'lg:col-span-1'
      }`}
    >
      {/* Card number */}
      <span className="absolute right-5 top-5 text-3xl font-semibold tracking-tight text-[#24384D] transition-colors group-hover:text-[#3B4D60]">
        {item.number}
      </span>

      {/* Abstract land-cover visual */}
      <div
        className={`relative h-32 overflow-hidden border border-[#35485B] ${
          featured ? 'lg:h-40' : ''
        }`}
      >
        <LandCoverVisual type={item.visual} />

        <div className="absolute bottom-3 left-3 border border-[#506176] bg-[#071426]/90 px-2 py-1">
          <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#DCE5ED]">
            {item.area}
          </span>
        </div>
      </div>

      {/* Category icon */}
      <div className="mt-6 flex h-10 w-10 items-center justify-center border border-[#F2B84B]/30 bg-[#F2B84B]/10 transition-colors group-hover:bg-[#F2B84B]/15">
        <Icon className="h-5 w-5 text-[#F2B84B]" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-[#EAF0F6]">
        {item.title}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-[#A9BCD0]">
        {item.description}
      </p>
    </article>
  )
}

function LandCoverVisual({ type }) {
  if (type === 'vegetation') {
    return (
      <div className="relative h-full bg-[#142E36]">
        <div className="absolute -left-8 top-5 h-28 w-44 rotate-12 rounded-[45%] bg-[#32634E]" />
        <div className="absolute right-5 top-2 h-24 w-32 rotate-[-18deg] rounded-[50%] bg-[#647D68]" />
        <div className="absolute bottom-[-20px] left-1/3 h-24 w-40 rounded-full bg-[#244A43]" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#F2B84B]/20" />
      </div>
    )
  }

  if (type === 'water') {
    return (
      <div className="relative h-full bg-[#102C40]">
        <div className="absolute -left-10 top-8 h-10 w-[130%] rotate-[-12deg] bg-[#397E96]" />
        <div className="absolute left-10 top-16 h-6 w-[90%] rotate-[8deg] bg-[#6BA6B7]/50" />
        <div className="absolute bottom-5 left-20 h-5 w-[70%] rotate-[-5deg] bg-[#8DBDC8]/30" />
      </div>
    )
  }

  if (type === 'agriculture') {
    return (
      <div className="relative h-full bg-[#414632]">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute left-0 top-0 h-full w-1/3 rotate-[12deg] bg-[#777C55]" />
          <div className="absolute left-1/3 top-0 h-full w-1/3 rotate-[12deg] bg-[#A18C53]" />
          <div className="absolute right-0 top-0 h-full w-1/3 rotate-[12deg] bg-[#606C4B]" />
        </div>
        <div className="absolute left-0 top-1/2 h-px w-full bg-[#F2B84B]/50" />
      </div>
    )
  }

  if (type === 'builtup') {
    return (
      <div className="relative h-full bg-[#263746]">
        <div className="absolute left-5 top-5 h-12 w-20 bg-[#657887]" />
        <div className="absolute left-28 top-10 h-20 w-12 bg-[#A5ADB4]" />
        <div className="absolute right-5 top-4 h-16 w-24 bg-[#536779]" />
        <div className="absolute bottom-5 left-12 h-4 w-40 rotate-[-8deg] bg-[#D3B16D]/70" />
        <div className="absolute bottom-10 right-8 h-3 w-24 rotate-[12deg] bg-[#83A9B4]/50" />
      </div>
    )
  }

  return (
    <div className="relative h-full bg-[#403C37]">
      <div className="absolute -left-5 bottom-0 h-24 w-48 rotate-[-12deg] bg-[#766D5D]" />
      <div className="absolute right-0 top-5 h-24 w-32 rotate-[18deg] bg-[#655B4D]" />
      <div className="absolute left-1/3 top-5 h-14 w-24 rotate-[-25deg] bg-[#B49A70]/70" />
      <div className="absolute inset-x-0 bottom-6 h-px bg-[#F2B84B]/40" />
    </div>
  )
}

export default LandCoverIntelligence
