
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Crosshair,
  Map,
  Play,
  Satellite,
} from 'lucide-react'

import Navbar from '../components/Navbar.jsx'
import StatsStrip from '../components/StatsStrip'
import HowItWorks from '../components/HowItWorks'
import LandCoverIntelligence from '../components/LandCoverIntelligence'
import ChangeDetection from '../components/ChangeDetection'
import ProtectedZoneAnalysis from '../components/ProtectedZoneAnalysis'
import ResultsInsights from '../components/ResultsInsights'
import AboutSection from '../components/AboutSection'

function Home() {
  const navigate = useNavigate()

  function explorePlatform() {
    document.getElementById('how-it-works')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main
      id="home"
      className="min-h-screen overflow-hidden bg-[#071426] text-[#EAF0F6]"
    >
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden bg-[#071426] pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(169,188,208,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(169,188,208,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="pointer-events-none absolute right-[10%] top-32 h-[500px] w-[500px] rounded-full bg-[#F2B84B]/[0.06] blur-[120px]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-6 py-20">
          {/* Hero text */}
          <div className="relative z-10 w-full max-w-2xl">
            <div className="mb-7 flex items-center gap-3">
              <div className="h-px w-10 bg-[#F2B84B]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F2B84B]">
                GeoAI · Environmental Intelligence
              </p>
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              See how our planet is{' '}
              <span className="text-[#F2B84B]">changing.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#A9BCD0] sm:text-lg">
              BhuNetra compares satellite imagery across time to detect
              land-cover changes, measure their extent and understand
              their relationship with protected environmental zones.
            </p>

            {/* Functional hero buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate('/analysis')}
                className="group flex items-center gap-3 bg-[#F2B84B] px-6 py-3.5 font-semibold text-[#071426] transition hover:bg-[#FFD071] focus:outline-none focus:ring-2 focus:ring-[#F2B84B] focus:ring-offset-2 focus:ring-offset-[#071426]"
              >
                Start Analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={explorePlatform}
                className="flex items-center gap-3 border border-[#526B84]/50 px-6 py-3.5 font-medium text-[#DCE5ED] transition hover:border-[#F2B84B] hover:text-[#F2B84B] focus:outline-none focus:ring-2 focus:ring-[#F2B84B]"
              >
                <Play className="h-4 w-4" />
                Explore Platform
              </button>
            </div>

            {/* Platform capabilities */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-[#879CB2]">
              <div className="flex items-center gap-2">
                <Satellite className="h-3.5 w-3.5 text-[#F2B84B]" />
                Satellite Imagery
              </div>

              <div className="flex items-center gap-2">
                <Map className="h-3.5 w-3.5 text-[#F2B84B]" />
                GIS Analysis
              </div>

              <div className="flex items-center gap-2">
                <Crosshair className="h-3.5 w-3.5 text-[#F2B84B]" />
                Change Detection
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 lg:block">
            <div className="relative h-full w-full overflow-hidden rounded-full border border-[#526B84]/40 bg-[#0D1C2B]">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(169,188,208,0.22) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(169,188,208,0.22) 1px, transparent 1px)
                  `,
                  backgroundSize: '45px 45px',
                }}
              />

              <div className="absolute left-[18%] top-[17%] h-[350px] w-[400px] rotate-[-12deg] rounded-[45%_55%_48%_52%] border border-[#526B84]/60 bg-[#142A40]/90">
                <div className="absolute left-[18%] top-[25%] h-px w-[65%] rotate-[15deg] bg-[#6C8BA7]/60" />
                <div className="absolute left-[10%] top-[48%] h-px w-[75%] rotate-[-8deg] bg-[#6C8BA7]/50" />
                <div className="absolute left-[30%] top-[65%] h-px w-[55%] rotate-[20deg] bg-[#6C8BA7]/50" />
              </div>

              {/* Earlier observation */}
              <div className="absolute left-8 top-24 w-48 border border-[#526B84]/50 bg-[#0D1C2B]/95 p-3 shadow-2xl">
                <div className="relative h-28 overflow-hidden bg-[#20382F]">
                  <div className="absolute left-5 top-5 h-14 w-16 rotate-12 bg-[#486B58]" />
                  <div className="absolute right-3 top-3 h-20 w-20 rounded-full bg-[#667653]" />
                  <div className="absolute bottom-2 left-10 h-10 w-28 rotate-[-15deg] bg-[#9A8050]" />

                  <div className="absolute bottom-2 left-2 text-[8px] uppercase tracking-[0.2em] text-white/80">
                    Satellite / T1
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#879CB2]">
                    12 Jun 2024
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F2B84B]" />
                </div>
              </div>

              {/* Illustrative change observation */}
              <div className="absolute bottom-20 right-5 w-52 border border-[#F2B84B]/30 bg-[#0D1C2B]/95 p-3 shadow-2xl">
                <div className="relative h-28 overflow-hidden bg-[#243746]">
                  <div className="absolute left-5 top-4 h-12 w-20 bg-[#526D5C]" />
                  <div className="absolute right-5 top-6 h-14 w-16 bg-[#B38E51]" />
                  <div className="absolute bottom-3 left-14 h-2 w-28 bg-[#F2B84B]/80" />

                  <div className="absolute bottom-2 left-2 text-[8px] uppercase tracking-[0.2em] text-white/80">
                    Change Detection
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#879CB2]">
                    Urban expansion
                  </span>
                  <span className="text-xs font-semibold text-[#F2B84B]">
                    +18.4 ha
                  </span>
                </div>
              </div>

              <div className="absolute right-24 top-20 border border-[#526B84]/50 bg-[#071426]/90 px-3 py-2">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-[#F2B84B]" />
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#A9BCD0]">
                    Multi-temporal
                  </span>
                </div>
              </div>

              <span className="absolute left-1/2 top-5 -translate-x-1/2 text-[8px] tracking-[0.25em] text-[#879CB2]">
                28°36′ N
              </span>

              <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.25em] text-[#879CB2]">
                77°13′ E
              </span>
            </div>
          </div>
        </div>
      </section>

      <StatsStrip />
      <HowItWorks />
      <LandCoverIntelligence />
      <ChangeDetection />
      <ProtectedZoneAnalysis />
      <ResultsInsights />
      <AboutSection />
    </main>
  )
}

export default Home
