import React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text-arrow';
  to?: string;
  arrow?: 'diagonal' | 'horizontal' | 'none';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  to,
  arrow = 'diagonal',
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-display uppercase tracking-wider text-xs md:text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed group';

  const variants = {
    primary:
      'bg-accent text-white px-7 py-4 hover:bg-[#d62839] hover:shadow-[0_0_25px_rgba(230,57,70,0.4)] active:scale-[0.98]',
    secondary:
      'bg-white text-primary px-7 py-4 hover:bg-neutral-200 active:scale-[0.98]',
    outline:
      'border border-border-custom bg-transparent text-white px-7 py-4 hover:border-accent hover:text-white hover:bg-white/5 active:scale-[0.98]',
    'text-arrow':
      'bg-transparent text-white p-0 hover:text-accent font-medium normal-case tracking-normal',
  };

  const renderArrow = () => {
    if (arrow === 'diagonal') {
      return (
        <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-current" />
      );
    }
    if (arrow === 'horizontal') {
      return (
        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-current" />
      );
    }
    return null;
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {renderArrow()}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={clsx(baseStyles, variants[variant], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={clsx(baseStyles, variants[variant], className)}
      disabled={disabled}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};

