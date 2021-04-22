import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Appointments from './pages/Appointments';
import Booking from './pages/Booking';
import Header from './components/Header';
import success from './pages/Home/AfterSubmit';

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
    <Header />
    <Container>
      <Switch>
        {routeList.map((route) => (
          <Route key={route.path} exact component={route.component} path={route.path} />
        ))}
      </Switch>
    </Container>
  </BrowserRouter>
);

export default routes;
