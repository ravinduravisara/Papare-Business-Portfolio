import React, { useState } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  isRouteErrorResponse,
} from 'react-router';
import type { LinksFunction } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import stylesheet from './app.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-primary text-white font-sans antialiased selection:bg-accent selection:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-primary text-white">
        {!isAdminRoute && <Navbar />}
        <div className="flex-1">
          <Outlet />
        </div>
        {!isAdminRoute && <Footer />}
      </div>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: { error?: any }) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-center">
      <span className="font-mono text-sm text-accent uppercase tracking-widest mb-4">
        // {message}
      </span>
      <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl text-white mb-6">
        {details}
      </h1>
      <p className="text-text-secondary text-base max-w-md mb-8">
        We apologize for the interruption. You can return to our homepage or explore our creative capabilities.
      </p>
      <a
        href="/"
        className="px-8 py-4 bg-accent text-white font-display text-xs uppercase font-bold tracking-wider hover:bg-[#d62839] transition-all"
      >
        RETURN TO HOMEPAGE
      </a>
      {stack && (
        <pre className="mt-8 p-4 bg-secondary text-left text-xs font-mono text-neutral-400 max-w-2xl overflow-x-auto border border-border-custom">
          {stack}
        </pre>
      )}
    </main>
  );
}
