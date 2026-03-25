// Aqui eu atribui as dependencias do servidor da api
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// aqui o Fe acessa a API
app.use(cors());
app.use(express.json());

app.use('/img', express.static(path.join(__dirname, 'data/img')));

// importa os dados dos JSONs
const personagens = require('./data/personagens.json');
const planetas = require('./data/planetas.json');
const naves = require('./data/naves.json');
const veiculos = require('./data/veiculos.json');
const especies = require('./data/especies.json');
const filmes = require('./data/filmes.json');

// rotas da API
app.get('/api/personagens', (req, res) => res.json(personagens));
app.get('/api/planetas', (req, res) => res.json(planetas));
app.get('/api/naves', (req, res) => res.json(naves));
app.get('/api/veiculos', (req, res) => res.json(veiculos));
app.get('/api/especies', (req, res) => res.json(especies));
app.get('/api/filmes', (req, res) => res.json(filmes));

// aqui inicia o servidor
app.listen(PORT, () => {
  console.log(`API Star Wars rodando em http://localhost:${PORT}`);
});
