import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './Button.js';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-primary">
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 text-accent">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
            Something went wrong
          </h2>
          <p className="text-text-secondary max-w-md mb-8">
            An unexpected error occurred while loading this section. Please refresh or return to the homepage.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              arrow="none"
            >
              Refresh Page
            </Button>
            <Button to="/" variant="primary" arrow="horizontal">
              Return Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

