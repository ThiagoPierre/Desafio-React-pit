import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
  <Navbar bg="primary" variant="dark" className="mb-5">
    <Navbar.Brand href="/">PitVac</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Faça Seu Agendamento!</Nav.Link>
    </Nav>
    <Link inline="true" className="nurseLink" to="/schedule">É um profissional de Saúde?</Link>
  </Navbar>
);

export default Header;
