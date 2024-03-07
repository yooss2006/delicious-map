import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { AppRouter } from '@/app/router';

import { AppProvider } from './providers';
import { theme } from './providers/chakra';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>
);
