import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import { cn } from '@/lib/cn'

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 18 L12 4 L20 18 L15 18 L12 12 L9 18 Z" fill="#0B0B0E" />
      <circle cx="19.5" cy="4.5" r="2.2" fill="#F5612B" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M2.5 13.5c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" />
    </svg>
  )
}

export function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isInterviewRoom = location.pathname.includes('/interview/')

  if (isInterviewRoom) return null

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#FAFAF7]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-[18px]">

        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <span
            className="text-[17px] font-bold tracking-[-0.02em] text-[#0B0B0E] group-hover:opacity-70 transition-opacity duration-200"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Intervue
          </span>
          <span className="chip ml-1 hidden sm:inline-flex">
            <span className="chip-dot" /> v2 · live
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-7 md:flex">
          {[
            { to: '/history',  label: 'Sessions' },
            { to: '/problems', label: 'Problems' },
            { to: '/setup',    label: 'Practice'  },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'text-sm transition-colors duration-200',
                location.pathname === to
                  ? 'font-semibold text-[#0B0B0E]'
                  : 'text-[#6B6B72] hover:text-[#0B0B0E]'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-ghost-pill text-sm font-medium text-[#38383D]">
                Sign in
              </button>
            </SignInButton>
            <button
              onClick={() => navigate('/setup')}
              className="btn-primary text-sm"
            >
              <span className="btn-dot" />
              Start a mock
              <span className="btn-arrow">→</span>
            </button>
          </SignedOut>

          <SignedIn>
            <button
              onClick={() => navigate('/setup')}
              className="btn-primary text-sm"
            >
              <span className="btn-dot" />
              New session
              <span className="btn-arrow">→</span>
            </button>
            <UserButton
              appearance={{
                variables: {
                  colorText: '#0B0B0E',
                  colorTextSecondary: '#6B6B72',
                  colorBackground: '#FFFFFF',
                  colorInputBackground: '#F4F3EE',
                },
                elements: {
                  avatarBox: 'w-8 h-8',
                  userButtonPopoverCard: 'shadow-[var(--shadow-elev)] border border-black/[0.08]',
                  userButtonPopoverActionButton: 'hover:bg-[#F4F3EE]',
                  userButtonPopoverFooter: '!hidden',
                  badge: '!hidden',
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Account"
                  labelIcon={<AccountIcon />}
                  onClick={() => navigate('/account')}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
