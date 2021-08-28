import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/Form';
import colxa from '../../styles/colxa.png';

// Página que renderiza o formulário dentro do card genérico

const index = () => (
  <>
    <div className="split left">
      <div className="centered">
        <div className="centered">
          <div className="Blue">
            <img src={colxa} alt="colxa" />
            <h2 className="carrousel">
              {' '}
              Saiba a importância da vacinação
              {' '}
              <a href="https://portal.fiocruz.br/pergunta/qual-importancia-da-vacinacao-contra-covid-19#:~:text=Qual%20a%20importância%20da%20vacinação%20contra%20a%20Covid-19%3F,-17%2F03%2F2021&text=Compartilhar%3A,reduzir%20a%20circulação%20do%20vírus.">aqui!</a>
              {' '}
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div className="split right">
      <div className="centered">
        <h2> Faça seu agendamento! </h2>
        <br />
        <br />
        <Form />
        <p className="obrigatorio">
          <span>*</span>
          {' '}
          Campos Obrigatórios
        </p>
      </div>
      <Link inline="true" className="nurseLink" to="/schedule">É um profissional da Saúde?</Link>
    </div>
  </>
);

export default index;
