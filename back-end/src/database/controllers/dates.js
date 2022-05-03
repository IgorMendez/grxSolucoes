const createOrUpadte = (req, res) => {
  let countYes = 0;
  let countNo = 0;
  let countDontKnow = 0;

  const answers = req.body;

  Object.values(answers).forEach((e) => {
    if (e === 'Sim' || e === 'Agora!!') {
      countYes += 1;
    }
    if (e === 'Não') {
      countNo += 1;
    }
    if (e === 'Não sei') {
      countDontKnow += 1;
    }
  });

  return res.status(200).json({
    ...req.body,
    QuantidadePositiva: countYes,
    QuantidadeNegativa: countNo,
    QuantidadeNaoAvaliada: countDontKnow,
  });
};

module.exports = {
  createOrUpadte,
};
