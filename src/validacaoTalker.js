const autorizacaoHeaders = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
};
const validaNome = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
};
const validaAge = (req, res) => {
  const { age } = req.body;

  if (!age) {
    res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  };

  const validaTalk = (req, res) => {
    const { talk } = req.body;
    if (!talk) {
      res.status(400).json({
        message: 'O campo "talk" é obrigatório',
      });
    }
  };
  const validaWatchedAt = (req, res) => {
    const { talk: { watchedAt } } = req.body;
    if (!watchedAt) {
res.status(400).json({
  message: 'O campo "watchedAt" é obrigatório',
});
    }
  };
const validaRate = (req, res) => {
  const { talk: { rate } } = req.body;
  if (!rate && rate === 0) {
return res.status(400).json({
  message: 'O campo "rate" é obrigatório',
});
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
};

module.exports = {
  autorizacaoHeaders,
  validaAge,
  validaNome,
  validaRate,
  validaTalk,
  validaWatchedAt,
};