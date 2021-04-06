import React from 'react';
import ReactDOM from 'react-dom';

import 'react-datepicker/dist/react-datepicker.css';
import './styles/form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from './components/Form';

ReactDOM.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>,
  document.getElementById('root'),
);
