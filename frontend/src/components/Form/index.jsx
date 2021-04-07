/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Button, Container, Card, Col, Row,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Valores iniciais do formik
const initialValues = {
  name: '',
  birthday: '',
  booking: '',
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
});

function index() {
  // Configuração para o uso inicial do Formik
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Container>
      <Card>
        <Card.Header>
          Faça um Agendamento
        </Card.Header>
        <Card.Body>
          <form onSubmit={formik.handleSubmit}>
            <label className="form-title form-label" htmlFor="name">Nome</label>
            {/* Formik lida sozinho com os eventos do formulario, com handleChange e valuesname */}
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {/* Essa função apresenta o valor de erro caso haja um input em branco */}
            {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null }
            <Row>
              <Col>
                <label className="form-title"> Dia do nascimento </label>
                <input
                  className="form-control"
                  type="text"
                  id="birthday"
                  name="birthday"
                  onChange={formik.handleChange}
                  value={formik.values.birthday}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.birthday && formik.errors.birthday ? <div className="error">{formik.errors.birthday}</div> : null }
              </Col>

              <Col>
                <label className="form-title"> Data da Consulta </label>
                <input
                  className="form-control"
                  type="text"
                  id="booking"
                  name="booking"
                  onChange={formik.handleChange}
                  value={formik.values.booking}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.booking && formik.errors.booking ? <div className="error">{formik.errors.booking}</div> : null }
              </Col>
            </Row>
            <Button type="submit">Agendar</Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default index;
