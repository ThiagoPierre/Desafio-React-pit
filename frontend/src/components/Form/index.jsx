/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Button, Col, Row,
} from 'react-bootstrap';
import {
  Formik, Form, Field,
} from 'formik';
import { addDays } from 'date-fns';
import DatePicker from '../DatePicker';
import { initialValues, validationSchema, onSubmit } from './Formfuncs';
import SelectHour from '../Select/index';

function Forms() {
  // Configuração para o uso inicial do Formik
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <label className="form-title form-label" htmlFor="name">
          Nome
          {' '}
          <span> *</span>
        </label>
        {/* Recebe o nome do usuário que deseja agendar a consulta */}
        <Field
          className="form-control"
          type="text"
          id="name"
          name="name"
        />
        {/* Recebe a data de nascimento do usuário que deseja agendar a consulta */}
        <label htmlFor="birthday">
          Data de nascimento
          <span> *</span>
        </label>
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
            {/* Recebe o dia da consulta */}
            <label htmlFor="bookday">
              Dia da Consulta
              {' '}
              <span> *</span>
            </label>
            <DatePicker id="bookday" name="bookday" minDate={new Date()} maxDate={addDays(new Date(), 20)} />
          </Col>
          <Col>
            <label className="form-title form-label" htmlFor="hour">
              Hora da consulta
              {' '}
              <span> *</span>
            </label>
            {/* Recebe a hora da consulta */}
            <SelectHour name="hour" id="hour" />
          </Col>
        </Row>
        <Button type="submit" className="submit-button">
          Agendar
        </Button>
      </Form>
    </Formik>
  );
}
export default Forms;
