import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { Auth0ProviderApp } from './components/auth/Auth0ProviderApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderApp>
        <App />
      </Auth0ProviderApp>
    </BrowserRouter>
  </StrictMode>
);