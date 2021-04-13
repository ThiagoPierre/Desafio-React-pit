import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import axios from '../../utils/api';

const Appointments = () => {
  const [booking, setBooking] = useState([]);
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3636/api/booking');
      setBooking(response.data.data);
    } catch (e) {
      console.log('Não foi possível recuperar os dados!');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      {booking.map((bookings, index) => (
        // --------missing a key-----------------
        <Card key={bookings.id}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={index}>
              {bookings.booking}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              {bookings.name}
              {' '}
              {bookings.birthday}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default Appointments;
