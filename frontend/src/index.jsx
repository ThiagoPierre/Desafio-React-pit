import React from 'react';
import ReactDOM from 'react-dom';

import 'react-datepicker/dist/react-datepicker.css';
import './styles/form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Booking from './pages/Booking';

ReactDOM.render(
  <React.StrictMode>
    <Booking />
  </React.StrictMode>,
  document.getElementById('root'),
);
