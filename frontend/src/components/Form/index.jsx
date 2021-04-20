/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Button, Col, Row,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { format, parseISO, addDays } from 'date-fns';
import DatePicker from '../DatePicker';
import { initialValues } from './Formfuncs';
import SelectHour from '../Select/index';
import axios from '../../utils/api';

const onSubmit = async (values) => {
  const date = JSON.parse(JSON.stringify(values));
  const formatedBookday = format(parseISO(date.bookday), 'dd/MM/yyyy');
  const formatedBirthday = format(parseISO(date.birthday), 'dd/MM/yyyy');

  const newObj = {
    bookday: formatedBookday,
    hour: values.hour,
    name: values.name,
    birthday: formatedBirthday,
  };

  try {
    await axios.post('http://localhost:3636/api/booking', newObj);
    alert('feito com sucesso');
    window.open('http://localhost:3000/success', '_self');
  } catch (e) {
    alert(e.response.data.message);
  }
};

function index() {
  // Configuração para o uso inicial do Formik

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      /* validationSchema={validationSchema} */
    >
      <Form>
        <label className="form-title form-label" htmlFor="name">Nome</label>
        {/* Recebe o nome do usuário que deseja agendar a consulta */}
        <Field
          className="form-control"
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="birthday">Seu aniversário</label>
        <DatePicker
          id="birthday"
          name="birthday"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <Row>
          <Col>
            <label htmlFor="bookday"> Dia da Consulta</label>
            <DatePicker id="bookday" name="bookday" minDate={new Date()} maxDate={addDays(new Date(), 20)} />
          </Col>
          <Col>
            <label className="form-title form-label" htmlFor="hour"> Hora da consulta</label>
            <SelectHour name="hour" />
            <ErrorMessage name="hour" />
          </Col>
        </Row>
        <Button type="submit">Agendar</Button>
      </Form>
    </Formik>
  );
}
export default index;
