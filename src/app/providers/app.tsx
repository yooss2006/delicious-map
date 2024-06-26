import { Box, CSSReset, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider } from '@/app/providers/chakra';
import { ReactQueryProvider } from '@/app/providers/react-query';
import { LoadingPage } from '@/shared/ui/layout';

import 'dayjs/locale/ko';

dayjs.locale('ko');

type Props = {
  children: React.ReactNode;
};

function ErrorFallback() {
  return <div>Error...</div>;
}

export function AppProvider({ children }: Props) {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <ReactQueryProvider>
            <ChakraProvider>
              <CSSReset />
              <Heading as="h1" className="visually-hidden">
                맛있을지도
              </Heading>
              <Box as="main" h="100%">
                <Router>{children}</Router>
              </Box>
            </ChakraProvider>
          </ReactQueryProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}
