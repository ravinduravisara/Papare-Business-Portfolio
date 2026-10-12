import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export const NAV_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'SERVICES', path: '/services' },
  { label: 'OUR WORK', path: '/projects' },
  { label: 'THEPAPARE STUDIOS', path: '/studios' },
  { label: 'OUR APPROACH', path: '/our-approach' },
  { label: 'CONTACT', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-primary/95 backdrop-blur-md border-b border-border-custom/80 py-4 shadow-xl'
            : 'bg-transparent py-6 md:py-8'
        )}
      >
        <div className="max-w-content mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded bg-accent flex items-center justify-center font-display font-black text-white text-lg tracking-wider shadow-[0_0_15px_rgba(230,57,70,0.5)] group-hover:scale-105 transition-transform duration-300">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl tracking-wider text-white uppercase leading-none">
                THEPAPARE
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-accent font-semibold uppercase leading-tight mt-0.5">
                EVENTS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'relative font-display text-xs tracking-widest uppercase transition-colors duration-200 py-1 font-semibold group',
                    active ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Button */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center bg-accent text-white font-display text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-none hover:bg-[#d62839] hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] transition-all duration-300 group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-white hover:text-accent transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Cinematic Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-primary/98 backdrop-blur-xl flex flex-col justify-between pt-28 pb-12 px-8 xl:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                // NAVIGATION
              </span>
              {NAV_LINKS.map((link, index) => {
                const active = isActive(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        'block font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight py-2 transition-colors',
                        active ? 'text-accent' : 'text-white hover:text-accent'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-8 border-t border-border-custom mt-8 flex flex-col gap-6">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-accent text-white font-display text-sm uppercase tracking-wider font-bold py-4 text-center flex items-center justify-center gap-2"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="flex justify-between items-center text-xs text-text-secondary font-mono">
                <span>COLOMBO, SRI LANKA</span>
                <span className="text-accent">EXPERIENCE BEYOND EVENTS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

