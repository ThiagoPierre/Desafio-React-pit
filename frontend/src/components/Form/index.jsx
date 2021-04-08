/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import DateView from 'react-datepicker';

// Valores iniciais do formik
const initialValues = {
  name: '',
  birthday: '',
  booking: '',
  birthDate: '',
};

// Ao dar submit no formulário, as informações aparecem no console.
const onSubmit = (values) => {
  console.log('Form data', values);
};

// Schema para validação utilizando a biblioteca Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Campo Obrigatório').min(2, 'Mínimo 2 caracteres').max(64, 'Limite de caracteres excedido'),
  // ------Trocar number por date depois da implementação do date picker--------
  birthday: Yup.number().required('Campo Obrigatório'),
  booking: Yup.number().required('Campo Obrigatório'),
  birthDate: Yup.date(),
});

function index() {
  // Configuração para o uso inicial do Formik

  return (
    <div>
      <Card.Header>
        Faça um Agendamento
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label className="form-title form-label" htmlFor="name">Nome</label>
            {/* Formik lida sozinho com os eventos do formulario(handleChange e valuesname) */}
            <Field
              className="form-control"
              type="text"
              id="name"
              name="name"
            />
            {/* Essa função apresenta o valor de erro caso haja um input em branco */}
            <ErrorMessage name="name" />
            <Row>
              <Col>
                <label className="form-title"> Dia do nascimento </label>
                <Field
                  className="form-control"
                  type="text"
                  id="birthday"
                  name="birthday"
                />
                <ErrorMessage name="birthday" />
              </Col>

              <Col>
                <label className="form-title"> Data da Consulta </label>
                <Field
                  className="form-control"
                  type="text"
                  id="booking"
                  name="booking"
                />
                <ErrorMessage name="booking" />
              </Col>
            </Row>
            <Row>
              <label> teste </label>
              <Field name="birthDate">
                {
                  ({ form, field, rest }) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    return (
                      <DateView
                        id="birthDate"
                        {...field}
                        {...rest}
                        selected={value}
                        onChange={(val) => setFieldValue('birthDate', val)}
                      />
                    );
                  }
                }
              </Field>

            </Row>
            <Button type="submit">Agendar</Button>
          </Form>
        </Formik>
      </Card.Body>
    </div>

  );
}
export default index;
