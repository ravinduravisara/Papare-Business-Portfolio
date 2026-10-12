import React from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { NAV_LINKS } from './Navbar.js';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, currentPath }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-primary/98 backdrop-blur-xl flex flex-col justify-between pt-28 pb-12 px-8 xl:hidden overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-7 right-7 p-2 text-white hover:text-accent"
            aria-label="Close Menu"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
              // NAVIGATION
            </span>
            {NAV_LINKS.map((link, index) => {
              const active =
                link.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.path);
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`block font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight py-2 transition-colors ${
                      active ? 'text-accent' : 'text-white hover:text-accent'
                    }`}
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
              onClick={onClose}
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
  );
};

