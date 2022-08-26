const express = require('express');
const bodyParser = require('body-parser');

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