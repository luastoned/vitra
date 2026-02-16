import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/App';

import 'unfonts.css';

const container = document.getElementById('app');

if (!container) {
  throw new Error("Root container '#app' not found");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
