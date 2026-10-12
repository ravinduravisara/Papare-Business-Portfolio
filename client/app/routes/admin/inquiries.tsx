import React, { useState } from 'react';
import type { MetaFunction } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api.js';
import { AdminSidebar } from '../../components/admin/AdminSidebar.js';
import { AdminHeader } from '../../components/admin/AdminHeader.js';
import { InquiryTable } from '../../components/admin/InquiryTable.js';
import { buildMetaTags } from '../../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Inquiry Management | Admin',
    noindex: true,
  });
};

export default function AdminInquiriesPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ['admin', 'inquiries', statusFilter, serviceFilter, searchTerm],
    queryFn: () =>
      api.getAdminInquiries({
        status: statusFilter !== 'All' ? statusFilter : undefined,
        service: serviceFilter !== 'All' ? serviceFilter : undefined,
        search: searchTerm || undefined,
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.updateInquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <AdminHeader
          title="INQUIRY MANAGEMENT"
          description="Review client proposals, leads, and event requirements."
        />

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="font-mono text-xs uppercase text-text-secondary block mb-1">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-secondary border border-border-custom px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="font-mono text-xs uppercase text-text-secondary block mb-1">
              Filter by Service
            </label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full bg-secondary border border-border-custom px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
            >
              <option value="All">All Services</option>
              <option value="Events & Experiences">Events & Experiences</option>
              <option value="Event Production & Technical Solutions">Event Production</option>
              <option value="Creative & Brand Solutions">Creative Solutions</option>
              <option value="Video & Media Production">Video Production</option>
              <option value="Social & Digital Content">Social Content</option>
              <option value="Studio Rental & Facilities">Studio Rental</option>
            </select>
          </div>

          <div>
            <label className="font-mono text-xs uppercase text-text-secondary block mb-1">
              Search Text
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name, company, message..."
              className="w-full bg-secondary border border-border-custom px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <InquiryTable
          inquiries={inquiries}
          onUpdateStatus={async (id, status) => {
            await updateStatusMutation.mutateAsync({ id, status });
          }}
          onDelete={async (id) => {
            await deleteMutation.mutateAsync(id);
          }}
        />
      </main>
    </div>
  );
}

