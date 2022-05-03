/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import Style from '../styles/formContainer.module.css';
import AnswersData from './answersData';

export default function FormContainer() {
  const [firstQuestion, setFirstQuestion] = useState();
  const [secondQuestion, setSecondQuestion] = useState();
  const [lettersCount, setLettersCount] = useState(0);
  const [colorText, setColorText] = useState('textareaFail');
  const [sendOrNot, setSendOrNot] = useState(false);
  const [showData, setShowData] = useState();
  const [dataObject, setDataObject] = useState({
    'Pergunta 1': false,
    'Pergunta 2': false,
    'Pergunta 3': false,
    'Pergunta 4': false,
  });

  useEffect(() => {
    const every = Object.values(dataObject).every((e) => e !== false);
    if (every && lettersCount > 15 && lettersCount < 201) {
      setSendOrNot(true);
      return;
    }
    setSendOrNot(false);
  }, [dataObject]);

  function sendData(data) {
    if (!sendOrNot) {
      return alert('Favor responder todas as perguntas');
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(data);

    const options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    return fetch('/data', options)
      .then((e) => e.json())
      .then((e) => setShowData(e));
  }

  const objectDataConstructor = (e) => {
    const { target: { value, name } } = e;
    const obj = { [name]: value };
    setDataObject({ ...dataObject, ...obj });
  };

  useEffect(() => {
    if (lettersCount > 200 || lettersCount < 16) {
      setColorText(Style.textareaFail);
      return;
    }
    setColorText('ok');
  }, [lettersCount]);

  useEffect(() => {
    if (firstQuestion) {
      firstQuestion.className = firstQuestion.value;
      return () => {
        firstQuestion.className = '';
      };
    }
  }, [firstQuestion]);

  const changeColor = (e) => {
    setFirstQuestion(e.target);
  };

  useEffect(() => {
    if (secondQuestion) {
      secondQuestion.className = secondQuestion.value;
      return () => {
        secondQuestion.className = '';
      };
    }
  }, [secondQuestion]);

  const changeColor2 = (e) => {
    setSecondQuestion(e.target);
  };

  return (
    <div
      className={Style.divFormContainer}
    >
      <form
        className={Style.formContainer}
      >
        <div
          className={Style.questionTitle}
        >
          Você se considera bom em lógica?
        </div>
        <label
          htmlFor="logic"
          onClick={(e) => changeColor(e)}
          role="radio"
          aria-checked="false"
          tabIndex="0"
          className={Style.labelForm}
        >
          <input
            onClick={(e) => {
              objectDataConstructor(e);
            }}
            name="Pergunta 1"
            id="logic"
            type="button"
            value="Sim"
            data-testid="input-radio"
          />
          <input
            onClick={(e) => {
              objectDataConstructor(e);
            }}
            name="Pergunta 1"
            id="logic"
            type="button"
            value="Não"
            data-testid="input-radio"
          />
        </label>
        <div
          className={Style.questionTitle}
        >
          Gosta de aprender com desafios?
        </div>
        <label
          htmlFor="challange"
          onClick={(e) => changeColor2(e)}
          role="radio"
          aria-checked="false"
          tabIndex="0"
          className={Style.labelForm}
        >
          <input
            onClick={(e) => {
              objectDataConstructor(e);
            }}
            name="Pergunta 2"
            id="challange"
            type="button"
            data-testid="input-radio"
            value="Sim"
          />
          <input
            onClick={(e) => {
              objectDataConstructor(e);
            }}
            name="Pergunta 2"
            id="challange"
            type="button"
            data-testid="input-radio"
            value="Não"
          />
        </label>
        <div>
          <div>
            Gostaria de fazer parte da GRX?
          </div>
          <select
            className={Style.selectForm}
            onChange={(e) => objectDataConstructor(e)}
            name="Pergunta 3"

          >
            <option
              name="fail"
            >
              {' '}
            </option>
            <option
              name="Pergunta 3"
            >
              Sim
            </option>
            <option
              name="Pergunta 3"
            >
              Não
            </option>
            <option
              name="Pergunta 3"
            >
              Não sei
            </option>
            <option
              name="Pergunta 3"
            >
              Agora!!
            </option>
          </select>
        </div>
        <div>
          <div>
            Por favor, justifique  a resposta anterior
          </div>
          <textarea
            className={Style.textareaForm}
            name="Pergunta 4"
            onChange={(e) => {
              setLettersCount(e.target.value.length);
              objectDataConstructor(e);
            }}
          />
          <div
            className={colorText}
          >
            {lettersCount}
            {' '}
            / 200
          </div>
        </div>
        <div
          className={Style.buttonContainerForm}
        >
          <button
            type="button"
            onClick={() => sendData(dataObject)}
            data-testid="send-button"
          >
            Enviar

          </button>
        </div>
        {showData && <AnswersData showData={showData} />}
        {/* {showData && <AnswersData />} */}
      </form>
    </div>
  );
}
