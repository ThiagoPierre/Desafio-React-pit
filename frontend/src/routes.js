import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Appointments from './pages/Appointments';
import Booking from './pages/Booking';

const routeList = [{
  path: '/enfermeira',
  name: 'enfermeira',
  component: Appointments,
},
{
  path: '/',
  name: 'Booking',
  component: Booking,
}];

const routes = () => (
  <BrowserRouter>
    <Switch>
      {routeList.map((route) => (
        <Route key={route.path} exact component={route.component} path={route.path} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default routes;
