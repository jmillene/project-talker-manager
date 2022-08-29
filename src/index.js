const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs').promises;
const { validaEmail } = require('./validaEmail');
const { validaPassword } = require('./validaPassword');

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

async function talkers() {
  const array = [];
  try {
    const data = await fs.readFile('src/talker.json', 'utf-8');
    const transformaJson = JSON.parse(data);
    console.log(transformaJson);
    return transformaJson;
  } catch (error) {
    return `${array}`;
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
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filtraid);
});
app.post('/talker', async (req, res) => {
  const newTalker = req.body;
  const talker = await talkers();
  console.log(talkers);
  talker.push(newTalker);
  return res.status(201).json(newTalker);
});

app.post('/login', validaEmail, validaPassword, async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});
