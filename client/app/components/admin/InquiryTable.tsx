import React, { useState } from 'react';
import type { InquiryDTO } from '@thepapare/shared';
import { Eye, Trash2, Mail, Phone, Calendar, Building, X } from 'lucide-react';
import { clsx } from 'clsx';

export interface InquiryTableProps {
  inquiries: InquiryDTO[];
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const InquiryTable: React.FC<InquiryTableProps> = ({
  inquiries,
  onUpdateStatus,
  onDelete,
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryDTO | null>(null);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      New: 'bg-accent/20 text-accent border-accent/40',
      Contacted: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      'In Progress': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      Completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      Archived: 'bg-neutral-800 text-neutral-400 border-neutral-700',
    };

    return (
      <span
        className={clsx(
          'px-2.5 py-0.5 text-[10px] font-mono uppercase font-semibold border rounded-none',
          styles[status] || styles.New
        )}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      <div className="overflow-x-auto border border-border-custom bg-secondary">
        <table className="w-full text-left text-sm">
          <thead className="bg-primary/80 border-b border-border-custom text-xs font-mono uppercase text-text-secondary">
            <tr>
              <th className="py-3 px-4">Contact & Company</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date Submitted</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-custom">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-text-secondary text-sm">
                  No inquiries received yet.
                </td>
              </tr>
            ) : (
              inquiries.map((item) => (
                <tr key={item._id || item.id} className="hover:bg-primary/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-display font-bold text-white text-sm">
                      {item.fullName}
                    </div>
                    <div className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                      <Building className="w-3 h-3 text-accent" />
                      <span>{item.company}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs text-neutral-200 font-sans">
                      {item.service}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      <select
                        value={item.status}
                        onChange={(e) => onUpdateStatus(item._id || item.id!, e.target.value)}
                        className="bg-primary border border-border-custom text-[11px] py-0.5 px-1.5 text-neutral-300 focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-text-secondary">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="p-1.5 bg-primary border border-border-custom text-neutral-300 hover:text-white hover:border-accent"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this inquiry?')) {
                            onDelete(item._id || item.id!);
                          }
                        }}
                        className="p-1.5 bg-primary border border-border-custom text-neutral-400 hover:text-red-400 hover:border-red-500"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="bg-secondary border border-border-custom max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
              <div>
                <span className="font-mono text-xs text-accent uppercase font-semibold">
                  INQUIRY // {selectedInquiry.service}
                </span>
                <h3 className="font-display font-bold text-xl uppercase text-white mt-1">
                  {selectedInquiry.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-2 gap-4 p-4 bg-primary/60 border border-border-custom text-xs">
                <div>
                  <span className="text-text-secondary block font-mono">COMPANY</span>
                  <span className="text-white font-semibold">{selectedInquiry.company}</span>
                </div>
                <div>
                  <span className="text-text-secondary block font-mono">TARGET DATE</span>
                  <span className="text-white font-semibold">{selectedInquiry.projectDate || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-text-secondary block font-mono">EMAIL</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-accent underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-text-secondary block font-mono">PHONE</span>
                  <span className="text-white">{selectedInquiry.phone}</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-xs text-text-secondary uppercase block mb-1.5">
                  PROJECT DESCRIPTION / REQUIREMENTS:
                </span>
                <div className="p-4 bg-primary border border-border-custom text-neutral-200 text-sm leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-custom flex justify-between items-center">
              <div className="text-xs text-text-secondary font-mono">
                Status: {selectedInquiry.status}
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 bg-accent text-white font-display text-xs uppercase font-semibold hover:bg-[#d62839]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

