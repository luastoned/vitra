import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/App';

// import '~/styles/fonts.css'
import 'unfonts.css';

const container = document.getElementById('app');
const root = createRoot(container as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
