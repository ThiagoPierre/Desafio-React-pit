import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import {
  Form, Button, Container, Card, Col, Row,
} from 'react-bootstrap';

const index = () => {
  const [startDate, setStartDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);

  return (
    <Container>
      <Card>
        <Card.Header>
          Make an Appointment
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Label className="form-title" htmlFor="name">Nome</Form.Label>
            <Form.Control type="text" id="name" name="name" />
            <Row>
              <Col>
                <Form.Label className="form-title"> Dia do nascimento </Form.Label>
                <DatePicker
                  id="date picker"
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="dd/MM/yyyy"
                  locale="pt-BR"
                />
              </Col>

              <Col>
                <Form.Label className="form-title"> Data da Consulta </Form.Label>
                <DatePicker
                  id="time picker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  locale="pt-BR"
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 20)}
                  timeForm
                />
              </Col>
            </Row>
            <Button type="submit">Agendar</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default index;
