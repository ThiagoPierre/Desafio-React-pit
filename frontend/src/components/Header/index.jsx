import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
  <Navbar bg="dark" variant="dark" className="mb-5">
    <Navbar.Brand href="/">CoronaVac</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
    <Link inline to="/enfermeira">É um profissional de Saúde?</Link>
  </Navbar>
);

export default Header;
