import { Box, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider } from '@/app/providers/chakra';
import { ReactQueryProvider } from '@/app/providers/react-query';
import 'dayjs/locale/ko';
import { ModalProvider } from '@/shared/lib/modal';

dayjs.locale('ko');

type Props = {
  children: React.ReactNode;
};

function ErrorFallback() {
  return <div>Error...</div>;
}

export function AppProvider({ children }: Props) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <ReactQueryProvider>
            <ChakraProvider>
              <ModalProvider>
                <Heading as="h1" className="visually-hidden">
                  맛있을지도
                </Heading>
                <Box as="main" h="100%">
                  <Router>{children}</Router>
                </Box>
              </ModalProvider>
            </ChakraProvider>
          </ReactQueryProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}
