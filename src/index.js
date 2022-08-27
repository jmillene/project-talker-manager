const express = require('express');
const bodyParser = require('body-parser');

const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const fs = require('fs').promises;

async function talkers() {
  const array = [];
  try {
    const data = await fs.readFile('src/talker.json', 'utf-8');
    const transformaJson = JSON.parse(data);
    console.log(transformaJson);
    return transformaJson;
  } catch (error) {
    return (`${array}`);
  }
}
app.get('/talker', async (req, res) => {
  const listTalkers = await talkers();
  return res.status(200).json(listTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkerId = await talkers();
  const filtraid = talkerId.find(({ id }) => id === Number(req.params.id));
  if (!filtraid) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filtraid);
});

app.post('/login',(req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const {email,password} = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O \"password\" deve ter pelo menos 6 caracteres'
    });
  }
  const validacaoEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const valEmail = validacaoEmail.test(email);
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!valEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return res.status(200).json({ token });
});