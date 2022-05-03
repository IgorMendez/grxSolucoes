/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Style from '../styles/formContainer.module.css';

export default function AnswersData({ showData }) {
  const [AllQuantities, setAllQuantities] = useState();
  const [quantidadePositiva, setQuantidadePositiva] = useState(0);
  const [quantidadeNegativa, setQuantidadeNegativa] = useState(0);
  const [quantidadeNaoAvaliada, setQuantidadeNaoAvaliada] = useState(0);
  const [arr, setArr] = useState([]);

  const renderPositive = () => (
    <div
      className={Style.answersQuantitiesContainer}
    >
      <div>
        <p>Quantidade Positiva</p>
        <div
          className={Style.answersQuantities}
        >
          {quantidadePositiva}

        </div>
      </div>
      <div>
        <p>% Positiva</p>
        <div
          className={Style.answersQuantities}
        >
          {((quantidadePositiva * 100) / AllQuantities).toFixed(2)}
          %
        </div>
      </div>
    </div>
  );

  const renderNegative = () => (
    <div
      className={Style.answersQuantitiesContainer}
    >
      <div>
        <p>Quantidade Negativo</p>
        <div
          className={Style.answersQuantities}
        >
          {quantidadeNegativa}

        </div>
      </div>
      <div>
        <p>% Negativo</p>
        <div
          className={Style.answersQuantities}
        >
          {((quantidadeNegativa * 100) / AllQuantities).toFixed(2)}
          %
        </div>
      </div>
    </div>
  );

  const renderNoAnswer = () => (
    <div
      className={Style.answersQuantitiesContainer}
    >
      <div>
        <p>Quantidade Não Avaliada</p>
        <div
          className={Style.answersQuantities}
        >
          {quantidadeNaoAvaliada}
        </div>
      </div>
      <div>
        <p>% Não Avaliada</p>
        <div
          className={Style.answersQuantities}
        >
          {((quantidadeNaoAvaliada * 100) / AllQuantities).toFixed(2)}
          %
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (showData) {
      // eslint-disable-next-line no-console
      console.log(showData);
      const {
        QuantidadePositiva,
        QuantidadeNegativa,
        QuantidadeNaoAvaliada,
      } = showData;
      setAllQuantities(QuantidadePositiva + QuantidadeNegativa + QuantidadeNaoAvaliada);
      setQuantidadePositiva(QuantidadePositiva);
      setQuantidadeNegativa(QuantidadeNegativa);
      setQuantidadeNaoAvaliada(QuantidadeNaoAvaliada);
    }
  }, [showData]);

  useEffect(() => {
    setArr([
      [quantidadePositiva, renderPositive],
      [quantidadeNegativa, renderNegative],
      [quantidadeNaoAvaliada, renderNoAnswer]]);
  }, [quantidadeNaoAvaliada, quantidadeNegativa, quantidadePositiva]);

  return (
    <section
      className={Style.answersContainer}
    >
      <div
        className={Style.answersContainerDiv}
      >
        <p>Total</p>
        <div
          className={Style.answersTotal}
        >
          {AllQuantities}
        </div>
      </div>
      {AllQuantities && arr
        .sort()
        .reverse()
        .map((e, i) => (
          <div key={`${i + 1}`}>
            {e[1]()}
          </div>
        ))}
      <div />
      <p>
        * JSON está exposto no console
      </p>
    </section>
  );
}
