import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-6xl mb-4">🏀</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Ups! Nešto je pošlo po zlu
            </h1>
            <p className="text-gray-600 mb-8">
              Došlo je do greške prilikom učitavanja stranice. Molimo pokušajte ponovo.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary mr-4"
            >
              Osvežite stranicu
            </button>
            <a href="/" className="btn-secondary">
              Idite na početnu
            </a>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-red-600 font-medium">
                  Debug informacije
                </summary>
                <pre className="mt-4 p-4 bg-red-50 text-red-800 text-xs overflow-auto rounded">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}