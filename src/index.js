const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs').promises;
const { validaEmail } = require('./validaEmail');
const { validaPassword } = require('./validaPassword');
const {  
  autorizacaoHeaders,
  validaAge,
  validaNome,
  validaRate,
  validaTalk,
  validaWatchedAt,
  validacaoWatchDate } = require('./validacaoTalker');

const armazenaJson = 'src/talker.json';
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
    const data = await fs.readFile(armazenaJson, 'utf-8');
    const transformaJson = JSON.parse(data);
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
app.post('/talker', 
autorizacaoHeaders,
validaAge,
validaNome,
validaTalk,
validaRate,
validaWatchedAt,
validacaoWatchDate, async (req, res) => {
  const newTalker = req.body;
  const data = await fs.readFile(armazenaJson, 'utf-8');
  const transformaJson = await JSON.parse(data);
  const newObj = { id: transformaJson.length + 1, ...newTalker };
  console.log(newObj);
  transformaJson.push(newObj);
  await fs.writeFile(armazenaJson, JSON.stringify(transformaJson));
  return res.status(201).json(newObj);
});

app.post('/login', validaEmail, validaPassword, async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.put('/talker/:id', autorizacaoHeaders,
validaAge,
validaNome,
validaTalk,
validaRate,
validaWatchedAt,
validacaoWatchDate, async (req, res) => {
  const newTalker = req.body;
  const data = await fs.readFile(armazenaJson, 'utf-8');
  const transformaJson = await JSON.parse(data);
  const newObj = { id: transformaJson.length + 1, ...newTalker };
  transformaJson.push(newObj);
  await fs.writeFile(armazenaJson, JSON.stringify(transformaJson));
  return res.status(200).json(newObj);
});