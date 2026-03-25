# Star Wars Explorer

Se você ama Star Wars tanto quanto eu, venha explorar o universo da saga comigo. Os dados são fornecidos por uma API local desenvolvida em Node.js e consumidos no frontend com JavaScript puro, garantindo uma experiência leve e direta.

---

## Funcionalidades:

- Navegação por categorias: Personagens, Planetas, Naves, Veículos, Espécies e Filmes
- Busca em tempo real filtrando pelo nome dentro de cada categoria
- Cards com efeito flip 3D — frente exibe a imagem, verso exibe um resumo
- Modal de detalhes ao clicar no card, com todos os campos do item
- Fundo animado com estrelas geradas dinamicamente via JavaScript e um cometa em CSS
- Fechar modal clicando fora ou pressionando `ESC`

---

## Tecnologias que eu usei:

- HTML, CSS e JavaScript puro no frontend
- Node.js no backend servindo os arquivos JSON como API REST
- Fontes Orbitron e Rajdhani via Google Fonts

---

## Aqui você entende a estrutura:

Starwarsexplorer/
├── backend/
│ ├── data/
│ │ ├── img/
│ │ ├── especies.json
│ │ ├── filmes.json
│ │ ├── naves.json
│ │ ├── personagens.json
│ │ ├── planetas.json
│ │ └── veiculos.json
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
└── frontend/
├── index.html
├── script.js
└── style.css

---

## Como rodar:

Precisa ter o Node.js instalado.

```bash
# Clone o repositório
git clone https://github.com/Midstacksec/ApiStarWarsExplorer.git

# Entre na pasta do backend
cd Starwarsexplorer/backend

# Instale as dependências
npm install

# Inicie o servidor
node server.js
```

Com o servidor rodando, abra o `frontend/index.html` no navegador. A API fica disponível em `http://localhost:3000/api`.

### Rotas disponíveis:

| Método | Rota               |
|--------|--------------------|
| GET    | `/api/personagens` |
| GET    | `/api/planetas`    |
| GET    | `/api/naves`       |
| GET    | `/api/veiculos`    |
| GET    | `/api/especies`    |
| GET    | `/api/filmes`      |

---

## Autora

**Fernanda Duarte**
[LinkedIn](https://www.linkedin.com/in/fernanda-amorim-duarte-8883903a7/)
