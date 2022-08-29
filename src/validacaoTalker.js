const autorizacaoHeaders = (req, res, next) => {
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
  next();
};
const validaNome = (req, res, next) => {
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
  next();
};
const validaAge = (req, res, next) => {
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
  next();
};

const validaTalk = (req, res, next) => {
  const { talk } = req.body;
  console.log(talk);
  if (!talk || talk === '') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  next();
};
const validaWatchedAt = (req, res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;
  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  next();
};
const validacaoWatchDate = (req, res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;
  const date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!date.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};
const validaRate = (req, res, next) => {
  const {
    talk: { rate },
  } = req.body;
  if (!rate) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

module.exports = {
  autorizacaoHeaders,
  validaAge,
  validaNome,
  validaRate,
  validaTalk,
  validaWatchedAt,
  validacaoWatchDate,
};
