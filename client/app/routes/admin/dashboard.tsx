import React from 'react';
import { Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api.js';
import { AdminSidebar } from '../../components/admin/AdminSidebar.js';
import { AdminHeader } from '../../components/admin/AdminHeader.js';
import {
  FolderKanban,
  Briefcase,
  Users,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  Plus,
} from 'lucide-react';
import { buildMetaTags } from '../../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Dashboard Overview | Admin',
    noindex: true,
  });
};

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => api.getDashboardStats(),
    refetchInterval: 30000,
  });

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <AdminHeader
          title="OVERVIEW DASHBOARD"
          description="Real-time agency metrics, active projects, and latest business inquiries."
          actions={
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white font-display text-xs uppercase font-semibold hover:bg-[#d62839]"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Link>
          }
        />

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Projects Card */}
          <div className="p-6 bg-secondary border border-border-custom flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-secondary uppercase">
                  PROJECTS
                </span>
                <FolderKanban className="w-5 h-5 text-accent" />
              </div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                {stats?.totalProjects ?? 4}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-custom/60 flex justify-between text-xs text-text-secondary">
              <span>Published: {stats?.publishedProjects ?? 4}</span>
              <span>Drafts: {stats?.draftProjects ?? 0}</span>
            </div>
          </div>

          {/* Services Card */}
          <div className="p-6 bg-secondary border border-border-custom flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-secondary uppercase">
                  SERVICES
                </span>
                <Briefcase className="w-5 h-5 text-accent" />
              </div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                {stats?.totalServices ?? 6}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-custom/60 text-xs text-text-secondary">
              Integrated Capabilities
            </div>
          </div>

          {/* Inquiries Card */}
          <div className="p-6 bg-secondary border border-border-custom flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-secondary uppercase">
                  INQUIRIES
                </span>
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                {stats?.totalInquiries ?? 0}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-custom/60 flex justify-between text-xs">
              <span className="text-accent font-semibold font-mono">
                {stats?.newInquiries ?? 0} New
              </span>
              <span className="text-text-secondary">Needs Review</span>
            </div>
          </div>

          {/* Clients Card */}
          <div className="p-6 bg-secondary border border-border-custom flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-secondary uppercase">
                  VERIFIED CLIENTS
                </span>
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                {stats?.totalClients ?? 5}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-custom/60 text-xs text-text-secondary">
              Active Partners
            </div>
          </div>
        </div>

        {/* Recent Inquiries Activity */}
        <div className="bg-secondary border border-border-custom p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold uppercase text-lg text-white">
                RECENT INQUIRY ACTIVITY
              </h3>
              <p className="text-text-secondary text-xs">
                Incoming leads and project inquiries from the public website
              </p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-display font-semibold uppercase text-accent hover:text-white flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
            <div className="divide-y divide-border-custom">
              {stats.recentInquiries.map((inq) => (
                <div key={inq._id || inq.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-display font-bold text-white text-sm block">
                      {inq.fullName} — <span className="text-text-secondary font-normal">{inq.company}</span>
                    </span>
                    <span className="text-xs text-accent font-mono block mt-0.5">
                      {inq.service}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-0.5 bg-accent/20 text-accent border border-accent/30 text-[10px] font-mono uppercase font-semibold">
                      {inq.status}
                    </span>
                    <Link
                      to="/admin/inquiries"
                      className="text-xs text-neutral-300 hover:text-white underline font-mono"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-text-secondary text-sm border border-border-custom/50">
              No recent inquiries recorded yet. Any inquiries submitted from the contact page will automatically show up here.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

