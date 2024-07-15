/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import React, { useEffect } from 'react';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import keycloak from './constant/Keycloak';

export default function App() {
  useScrollToTop();
  


  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'login-required',
        checkLoginIframe: false
      }}
    >
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
}
