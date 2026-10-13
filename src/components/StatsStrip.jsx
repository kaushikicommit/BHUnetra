import {
  BarChart3,
  CalendarDays,
  Layers3,
  Leaf,
} from 'lucide-react'

function StatsStrip() {
  const stats = [
    {
      icon: Leaf,
      value: '05',
      title: 'Land Cover Classes',
      description: 'Vegetation · Water · Agriculture · Urban · Barren',
    },
    {
      icon: CalendarDays,
      value: '02',
      title: 'Comparison Dates',
      description: 'Observe how a region changes over time',
    },
    {
      icon: Layers3,
      value: 'GIS',
      title: 'Spatial Analysis',
      description: 'Intersect detected changes with protected zones',
    },
    {
      icon: BarChart3,
      value: 'DATA',
      title: 'Environmental Insights',
      description: 'Turn satellite observations into clear statistics',
    },
  ]

  return (
    <section className="relative z-20 mx-auto -mt-8 max-w-7xl px-6">
      <div className="grid overflow-hidden border border-[#263B50] bg-[#0D1C2B] md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className={`group relative p-6 transition-colors duration-300 hover:bg-[#142A40] ${
                index !== stats.length - 1
                  ? 'border-b border-[#263B50] lg:border-b-0 lg:border-r'
                  : ''
              }`}
            >
              <div className="absolute right-5 top-5 text-[9px] tracking-[0.2em] text-[#60758B]">
                0{index + 1}
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#F2B84B]/25 bg-[#F2B84B]/10 transition-colors duration-300 group-hover:border-[#F2B84B]/50 group-hover:bg-[#F2B84B]/15">
                  <Icon className="h-5 w-5 text-[#F2B84B]" />
                </div>

                <div>
                  <p className="text-2xl font-bold tracking-tight text-[#EAF0F6]">
                    {stat.value}
                  </p>

                  <h3 className="mt-1 text-sm font-semibold text-[#DCE5ED]">
                    {stat.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#9AADC0]">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default StatsStrip