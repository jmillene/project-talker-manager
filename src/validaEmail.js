const validaEmail = (req, res, next) => {
  const { email } = req.body;
  const validacaoEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const valEmail = validacaoEmail.test(email);
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!valEmail) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
module.exports = {
  validaEmail,
};