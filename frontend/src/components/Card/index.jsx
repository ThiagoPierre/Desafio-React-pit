import React from 'react';
import { Card } from 'react-bootstrap';

// Componente genérico para Card
const Box = ({
  cardTitle, children,
}) => (
  <div>
    <Card>
      <Card.Header>{cardTitle}</Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  </div>
);

export default Box;
