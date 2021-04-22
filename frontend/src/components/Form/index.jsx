/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Button, Col, Row,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { addDays } from 'date-fns';
import DatePicker from '../DatePicker';
import { initialValues, validationSchema, onSubmit } from './Formfuncs';
import SelectHour from '../Select/index';

function index() {
  // Configuração para o uso inicial do Formik

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
        <ErrorMessage name="name" component="div" className="error" />
        <label htmlFor="birthday">Data de nascimento</label>
        <DatePicker
          id="birthday"
          name="birthday"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <ErrorMessage name="birthday" component="div" className="error" />
        <Row>
          <Col>
            <label htmlFor="bookday"> Dia da Consulta</label>
            <DatePicker id="bookday" name="bookday" minDate={new Date()} maxDate={addDays(new Date(), 20)} />
            <ErrorMessage name="bookday" component="div" className="error" />
          </Col>
          <Col>
            <label className="form-title form-label" htmlFor="hour"> Hora da consulta</label>
            <SelectHour name="hour" id="hour" />
            <ErrorMessage name="hour" component="div" className="error" />
          </Col>
        </Row>
        <Button type="submit">Agendar</Button>
      </Form>
    </Formik>
  );
}
export default index;
