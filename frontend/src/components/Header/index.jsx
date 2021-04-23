import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="primary" variant="dark" className="mb-5">
    <Navbar.Brand href="/">PitVac</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Faça Seu Agendamento!</Nav.Link>
    </Nav>
    <Nav.Link inline="true" className="nurseLink" href="/schedule">É um profissional de Saúde?</Nav.Link>
  </Navbar>
);

export default Header;
