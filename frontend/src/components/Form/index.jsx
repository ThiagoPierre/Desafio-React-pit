/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Button, Col, Row,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import DatePicker from '../DatePicker';
import { initialValues } from './Formfuncs';
import axios from '../../utils/api';

const onSubmit = async (values) => {
  try {
    await axios.post('http://localhost:3636/api/booking', values);
  } catch (e) {
    console.log('Teste');
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
        <label className="form-title form-label" htmlFor="hours[0].user[0].name">Nome</label>
        {/* Recebe o nome do usuário que deseja agendar a consulta */}
        <Field
          className="form-control"
          type="text"
          id="hours[0].user[0].name"
          name="hours[0].user[0].name"
        />
        {/* Essa função apresenta o valor de erro caso haja um input em branco */}
        <ErrorMessage name="hours[0].user[0].name" />
        {/* Recebe o aniversário do usuário usando o componente datepicker */}
        <label htmlFor="hours[0].user[0].birthday">Seu aniversário</label>
        <DatePicker id="hours[0].user[0].birthday" fieldname="hours[0].user[0].birthday" />
        {/* recebe o dia e o horário da consulta por meio do datepicker */}
        <Row>
          <Col>
            <label htmlFor="bookday"> Dia da Consulta</label>
            <DatePicker id="bookday" fieldname="bookday" />
          </Col>
          <Col>
            <label className="form-title" htmlFor="hours[0].hour"> Horário da Consulta </label>
            <Field
              className="form-control"
              type="text"
              id="hours[0].hour"
              name="hours[0].hour"
            />
            <ErrorMessage name="hours[0].hour" />
          </Col>
        </Row>
        <Button type="submit">Agendar</Button>
      </Form>
    </Formik>
  );
}
export default index;
