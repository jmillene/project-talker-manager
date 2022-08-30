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
app.get('/talker/search', autorizacaoHeaders, async (req, res) => {
  const data = await fs.readFile(armazenaJson, 'utf-8');
  const transformaJson = await JSON.parse(data);
  const { q } = req.query;
  const filtraNome = transformaJson.filter((elemento) => elemento.name.includes(q));
  return res.status(200).json(filtraNome);
});

app.get('/talker/:id', async (req, res) => {
  const talkerId = await talkers();
  const filtraid = talkerId.find(({ id }) => id === Number(req.params.id));
  console.log(filtraid);
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
  const data = await fs.readFile(armazenaJson, 'utf-8');
  const transformaJson = await JSON.parse(data);
  const id = Number(req.params.id);
  const newTalker = {
    ...req.body,
    id,
  };
  const index = transformaJson.findIndex((elemento) => elemento.id === Number(id));
  console.log('antes', transformaJson);
  transformaJson[index] = newTalker;
  console.log('depois', transformaJson);
  await fs.writeFile(armazenaJson, JSON.stringify(transformaJson));
  return res.status(200).json(newTalker);
});
app.delete('/talker/:id', autorizacaoHeaders, async (req, res) => {
 const data = await fs.readFile(armazenaJson, 'utf-8');
 const transformaJson = await JSON.parse(data);
 const id = Number(req.params.id);
 const deleteItem = transformaJson.filter((elemento) => elemento.id !== id);
 await fs.writeFile(armazenaJson, JSON.stringify(deleteItem));
 return res.status(204).json();
});
