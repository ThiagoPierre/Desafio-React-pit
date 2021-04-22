import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/form.css';

import Routes from './routes';
import ScheduleContextProvider from './ScheduleContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <ScheduleContextProvider>
      <ToastContainer />
      <Routes />
    </ScheduleContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
