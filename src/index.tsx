import React from 'react';
import ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { setupStore } from './store/store';

const store = setupStore();

const root = ReactDom.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
