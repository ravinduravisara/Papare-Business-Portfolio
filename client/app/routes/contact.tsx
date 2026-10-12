import React, { useState } from 'react';
import type { MetaFunction } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, type InquiryInput } from '@thepapare/shared';
import { api } from '../lib/api.js';
import { buildMetaTags } from '../lib/seo.js';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Contact Us | Start a Project with ThePapare Events',
    description:
      'Initiate an event, brand activation, LED wall production, video commercial, or studio inquiry with ThePapare Events in Colombo, Sri Lanka.',
    canonical: 'https://thepapare.events/contact',
  });
};

const SERVICE_OPTIONS = [
  'Events & Experiences',
  'Event Production & Technical Solutions',
  'Creative & Brand Solutions',
  'Video & Media Production',
  'Social & Digital Content',
  'Studio Rental & Facilities',
  'Other / Custom Requirement',
];

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      phone: '',
      service: 'Events & Experiences',
      projectDate: '',
      budget: '',
      message: '',
      privacyConsent: true,
    },
  });

  const onSubmit = async (data: InquiryInput) => {
    setErrorMessage(null);
    try {
      await api.submitInquiry(data);
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message ||
          'Failed to submit your inquiry. Please verify your internet connection or email us directly.'
      );
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-36 pb-16 md:pt-48 md:pb-24 border-b border-border-custom bg-secondary/30">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">
            // INITIATE AN ENGAGEMENT
          </span>
          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] max-w-5xl mb-6">
            LET'S CREATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-accent">
              SOMETHING IMPACTFUL.
            </span>
          </h1>
          <p className="text-text-secondary text-base md:text-xl max-w-3xl leading-relaxed font-sans">
            Whether you need a complete event, a brand activation, an LED wall solution, a commercial production, digital content or a professional studio, ThePapare Events is ready to help bring your next project to life.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Contact Info */}
      <section className="py-20 md:py-28 max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-secondary border border-border-custom p-8 md:p-12 relative">
              <h2 className="font-display font-bold uppercase text-2xl text-white mb-2">
                PROJECT INQUIRY FORM
              </h2>
              <p className="text-text-secondary text-sm mb-8 font-sans">
                Fill in the details below and our team will get in touch to discuss your requirements.
              </p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-950/30 border border-emerald-800 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase text-xl text-white">
                    Inquiry Successfully Received
                  </h3>
                  <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to ThePapare Events. Your project details have been recorded, and an event producer will review your requirements shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-accent text-white font-display text-xs uppercase font-semibold hover:bg-[#d62839]"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('fullName')}
                        disabled={isSubmitting}
                        placeholder="e.g. Ruwan Perera"
                        className="w-full bg-primary border border-border-custom px-4 py-3 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-50"
                      />
                      {errors.fullName && (
                        <span className="text-xs text-red-400 font-mono mt-1 block">
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        {...register('company')}
                        disabled={isSubmitting}
                        placeholder="e.g. Dialog Axiata"
                        className="w-full bg-primary border border-border-custom px-4 py-3 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-50"
                      />
                      {errors.company && (
                        <span className="text-xs text-red-400 font-mono mt-1 block">
                          {errors.company.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        disabled={isSubmitting}
                        placeholder="e.g. ruwan@company.com"
                        className="w-full bg-primary border border-border-custom px-4 py-3 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-50"
                      />
                      {errors.email && (
                        <span className="text-xs text-red-400 font-mono mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        disabled={isSubmitting}
                        placeholder="e.g. +94 77 123 4567"
                        className="w-full bg-primary border border-border-custom px-4 py-3 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-50"
                      />
                      {errors.phone && (
                        <span className="text-xs text-red-400 font-mono mt-1 block">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                      Service Required *
                    </label>
                    <select
                      {...register('service')}
                      disabled={isSubmitting}
                      className="w-full bg-primary border border-border-custom px-4 py-3 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-50"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <span className="text-xs text-red-400 font-mono mt-1 block">
                        {errors.service.message}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                        Target Project Date (Optional)
                      </label>
                      <input
                        type="text"
                        {...register('projectDate')}
                        disabled={isSubmitting}
                        placeholder="e.g. November 2026 or Q4"
                        className="w-full bg-primary border border-border-custom px-4 py-3 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                        Estimated Budget (Optional)
                      </label>
                      <input
                        type="text"
                        {...register('budget')}
                        disabled={isSubmitting}
                        placeholder="e.g. LKR / USD range"
                        className="w-full bg-primary border border-border-custom px-4 py-3 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                      Project Description &amp; Requirements *
                    </label>
                    <textarea
                      rows={4}
                      {...register('message')}
                      disabled={isSubmitting}
                      placeholder="Please share your event concept, expected venue, scale, technical requirements, or creative goals..."
                      className="w-full bg-primary border border-border-custom px-4 py-3 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-50"
                    />
                    {errors.message && (
                      <span className="text-xs text-red-400 font-mono mt-1 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent hover:bg-[#d62839] text-white font-display text-sm uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(230,57,70,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>SUBMITTING INQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT INQUIRY</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-secondary border border-border-custom space-y-6">
              <span className="font-mono text-xs uppercase text-accent font-bold block">
                // DIRECT AGENCY CONTACT
              </span>
              <h3 className="font-display font-bold uppercase text-xl text-white">
                WE ARE READY TO COLLABORATE
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Reach out directly to schedule a face-to-face creative briefing or technical venue walkthrough with our team in Colombo.
              </p>

              <div className="space-y-4 pt-4 border-t border-border-custom text-sm font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Office &amp; Studio Location</span>
                    <span className="text-neutral-400 text-xs">Colombo, Western Province, Sri Lanka</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Direct Inquiries</span>
                    <a href="mailto:contact@thepapare.events" className="text-accent underline text-xs">
                      contact@thepapare.events
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Telephone</span>
                    <span className="text-neutral-300 text-xs">+94 11 234 5678</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-primary border border-border-custom">
              <span className="font-mono text-xs uppercase text-text-secondary tracking-widest block mb-2">
                AGENCY PROMISE
              </span>
              <p className="font-display font-bold text-white text-base uppercase mb-2">
                ONE PARTNER. MULTIPLE CAPABILITIES. END-TO-END EXECUTION.
              </p>
              <p className="text-text-secondary text-xs leading-relaxed font-sans">
                Whether you need a high-impact corporate conference, bespoke LED screen installation, television commercial, or brand activation, we orchestrate the entire production lifecycle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

