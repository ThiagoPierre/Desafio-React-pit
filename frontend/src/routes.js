import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Appointments from './pages/Appointments';
import Booking from './pages/Booking';
import success from './pages/afterSubmit';

const routeList = [{
  path: '/schedule',
  name: 'schedule',
  component: Appointments,
},
{
  path: '/',
  name: 'Booking',
  component: Booking,
}, {
  path: '/success',
  name: 'Success',
  component: success,
}];

const routes = () => (
  <BrowserRouter>
    {/* <Header /> */}
    <Switch>
      {routeList.map((route) => (
        <Route key={route.path} exact component={route.component} path={route.path} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default routes;
