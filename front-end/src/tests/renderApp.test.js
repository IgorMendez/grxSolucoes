import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Render index page with forms', () => {
  render(<App />);
  const linkElement = screen.getByText('Desafio Técnico - Coleta GRX Soluções');
  expect(linkElement);
});

test('Testing if all forms render correctly', () => {
  render(<App />);
  const titleArray = [
    'Você se considera bom em lógica?',
    'Gosta de aprender com desafios?',
    'Gostaria de fazer parte da GRX?',
    'Por favor, justifique a resposta anterior'];

  titleArray.map((el) => expect(screen.getByText(el)));
});

test('Verify if all buttons render', () => {
  render(<App />);
  const getAllButtons = screen.getAllByRole('button');
  expect(getAllButtons).toHaveLength(5);
});

test('Test radio questions', () => {
  render(<App />);
  const getAllInputs = screen.getAllByTestId('input-radio');
  getAllInputs.map((e) => expect(e));
});

test('Test click send button with no values', () => {
  render(<App />);
  const sendButton = screen.getByTestId('send-button');

  window.alert = () => 'Favor responder todas as perguntas';
  sendButton.click();
  expect(window.alert()).toEqual('Favor responder todas as perguntas');
});

test('Testing data when succes returned of api', async () => {
  const data = {
    'Pergunta 1': 'Sim',
    'Pergunta 2': 'Sim',
    'Pergunta 3': 'Sim',
    'Pergunta 4': 'Quero conhecer mais sobre a empresa, desafios e superá-los em  conjunto com um time incrível!',
    QuantidadeNaoAvaliada: 0,
    QuantidadeNegativa: 0,
    QuantidadePositiva: 3,
  };

  const sendData = {
    'Pergunta 1': 'Sim',
    'Pergunta 2': 'Sim',
    'Pergunta 3': 'Sim',
    'Pergunta 4': 'Quero conhecer mais sobre a empresa, desafios e superá-los em  conjunto com um time incrível!',
  };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(sendData);

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const getDatas = await fetch('http://localhost:3000/data', options);

  const dataJson = await getDatas.json();

  expect(dataJson).toStrictEqual(data);
});
