import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Users,
  MessageSquare,
  Image,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { clsx } from 'clsx';

const ADMIN_LINKS = [
  { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { label: 'Services', path: '/admin/services', icon: Briefcase },
  { label: 'Clients', path: '/admin/clients', icon: Users },
  { label: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  { label: 'Media Library', path: '/admin/media', icon: Image },
  { label: 'Website Settings', path: '/admin/settings', icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/admin/login';
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside className="w-64 bg-secondary border-r border-border-custom flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-border-custom">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-accent flex items-center justify-center font-display font-bold text-white text-base">
              P
            </div>
            <div>
              <span className="font-display font-bold text-base text-white tracking-wider block">
                THEPAPARE
              </span>
              <span className="font-mono text-[9px] text-accent font-semibold tracking-widest uppercase block">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {ADMIN_LINKS.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded font-display text-xs uppercase font-semibold transition-colors',
                  active
                    ? 'bg-accent text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-primary/50'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-border-custom space-y-3">
        {user && (
          <div className="px-3 py-2 bg-primary/40 rounded border border-border-custom/50">
            <span className="text-xs text-white font-medium block truncate">
              {user.name}
            </span>
            <span className="text-[10px] text-text-secondary font-mono block truncate">
              {user.email}
            </span>
          </div>
        )}

        <div className="flex gap-2">
          <Link
            to="/"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-primary/60 hover:bg-primary border border-border-custom text-[11px] font-display font-semibold uppercase text-neutral-300 rounded"
            title="Open Live Website"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-accent" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center py-2 px-3 bg-red-950/30 hover:bg-accent/20 border border-red-900/40 text-red-400 hover:text-white text-[11px] font-display font-semibold uppercase rounded transition-colors"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

