import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import ChakraProvider from '@/lib/chakra';
import { ReactQueryProvider } from '@/lib/react-query';

type Props = {
  children: React.ReactNode;
};

function ErrorFallback() {
  return <div>Error...</div>;
}

export default function AppProvider({ children }: Props) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <ReactQueryProvider>
            <ChakraProvider>
              <Router>{children}</Router>
            </ChakraProvider>
          </ReactQueryProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}
