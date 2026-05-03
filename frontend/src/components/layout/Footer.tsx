import { Link } from 'react-router-dom'

function Logo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 18 L12 4 L20 18 L15 18 L12 12 L9 18 Z" fill="#0B0B0E" />
      <circle cx="19.5" cy="4.5" r="2.2" fill="#F5612B" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/[0.06] bg-[#FAFAF7] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Logo />
          <span
            className="text-lg font-bold text-[#0B0B0E]"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Intervue
          </span>
        </div>

        <div className="flex items-center gap-8">
          {[
            { to: '/setup',    label: 'Practice'  },
            { to: '/problems', label: 'Problems'  },
            { to: '/history',  label: 'Sessions'  },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-mono text-xs uppercase tracking-widest text-[#9C9CA3] transition-colors duration-200 hover:text-[#0B0B0E]"
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="font-mono text-xs text-[#9C9CA3]">
          © {new Date().getFullYear()} Intervue
        </p>
      </div>
    </footer>
  )
}
