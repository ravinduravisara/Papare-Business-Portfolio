import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import { useAuth } from '../../hooks/useAuth.js';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { buildMetaTags } from '../../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Admin Console Login',
    noindex: true,
  });
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'Invalid email or password. Please verify credentials.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-secondary border border-border-custom p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded bg-accent flex items-center justify-center font-display font-black text-white text-2xl mx-auto mb-4">
            P
          </div>
          <h1 className="font-display font-bold uppercase text-2xl text-white tracking-wider">
            AGENCY MANAGEMENT
          </h1>
          <span className="font-mono text-xs text-accent uppercase tracking-widest block mt-1">
            THEPAPARE EVENTS CONSOLE
          </span>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@thepapare.events"
                className="w-full bg-primary border border-border-custom pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-primary border border-border-custom pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 bg-accent hover:bg-[#d62839] text-white font-display text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(230,57,70,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <span>SIGN IN TO CONSOLE</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-custom text-center">
          <Link to="/" className="text-xs text-text-secondary hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

