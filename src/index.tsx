import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './index.scss'; // 🔥 글로벌 SCSS 적용
import { Provider } from 'react-redux';
import store from './store'; // 설정한 Redux store

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

