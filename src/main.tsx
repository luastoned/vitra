import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/App';

import 'unfonts.css';

const container = document.getElementById('app') ?? document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
