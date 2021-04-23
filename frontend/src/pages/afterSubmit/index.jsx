import React from 'react';
import { Row, Col } from 'react-bootstrap';
import img from '../../styles/foto.png';

// O usuário, ao realizar um agendamento com sucesso, é levado para esta página

const index = () => (
  <div>
    <h2 className="success-title">
      Agendamento concluído com sucesso!
    </h2>
    <Row className="colorback">
      <Col>
        <img className="image" src={img} alt="" />
      </Col>
      <Col className="listCol">
        <h3>Não se esqueça de continuar tomando os cuidados mesmo depois da vacinação!</h3>
        <ul className="listaSuccess">
          <li className="list-item">Lavar frequentemente as mãos com água e sabão</li>
          <li className="list-item">Usar álcool em gel</li>
          <li className="list-item">Evitar tocar olhos, nariz e boca</li>
          <li className="list-item">Evitar contato com outras pessoas</li>
          <li className="list-item">Ficar em casa</li>
          <li className="list-item">Caso precise sair, utilizar a máscara</li>
        </ul>
      </Col>
    </Row>
    <h4>
      {' '}
      Saiba mais em:
      {' '}
      <a href="https://www.coronavirus.sc.gov.br/prevencao/">https://www.coronavirus.sc.gov.br/prevencao/</a>
    </h4>
  </div>
);

export default index;
