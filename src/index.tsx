import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Provider from './Provider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
