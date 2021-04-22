import React from 'react';
import { Row, Col } from 'react-bootstrap';

const index = () => (
  <div>
    <h2 className="success-title">
      Agendamento concluído com sucesso!
    </h2>
    <Row className="colorback">
      <Col>
        <img className="image" src="https://cdnv2.moovin.com.br/bbdu/imagens/produtos/det/adesivo-lembrete-de-higiene-lave-as-maos-bb16bce72ee8f98975fa012cd94f76fb.png" alt="" />
      </Col>
      <Col>
        <h3>Não se esqueça de continuar tomando os cuidados mesmo depois da vacinação!</h3>
        <ul>
          <li className="list-item">Lavar frequentemente as mãos com água e sabão</li>
          <li className="list-item">Usar álcool em gel</li>
          <li className="list-item">Evitar tocar olhos, nariz e boca</li>
          <li className="list-item">Evitar contato</li>
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
