
import { ArrowUpRight, Globe2 } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  function goToSection(sectionId) {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`)
      return
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#263B50] bg-[#071426]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border border-[#F2B84B]/40 bg-[#F2B84B]/10">
            <Globe2 className="h-5 w-5 text-[#F2B84B]" />
          </div>

          <div>
            <span className="text-2xl font-bold tracking-tight text-[#EAF0F6]">
              Bhu<span className="text-[#F2B84B]">Netra</span>
            </span>

            <p className="mt-0.5 text-[10px] font-semibold tracking-[0.3em] text-[#879CB2]">
              EARTH INTELLIGENCE
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <button
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/')
                return
              }

              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-sm font-medium text-[#EAF0F6] transition hover:text-[#F2B84B]"
          >
            Home
          </button>

          <button
            onClick={() => goToSection('explore')}
            className="text-sm font-medium text-[#A9BCD0] transition hover:text-[#F2B84B]"
          >
            Explore
          </button>

          <button
            onClick={() => goToSection('how-it-works')}
            className="text-sm font-medium text-[#A9BCD0] transition hover:text-[#F2B84B]"
          >
            How It Works
          </button>

          <button
            onClick={() => goToSection('about')}
            className="text-sm font-medium text-[#A9BCD0] transition hover:text-[#F2B84B]"
          >
            About
          </button>
        </div>

        <button
          onClick={() => navigate('/analysis')}
          className="hidden items-center gap-2 border border-[#F2B84B]/50 bg-[#F2B84B]/[0.06] px-5 py-3 text-sm font-semibold text-[#F2B84B] transition hover:bg-[#F2B84B] hover:text-[#071426] md:flex"
        >
          Start Analysis
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
