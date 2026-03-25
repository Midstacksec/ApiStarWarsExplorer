// criei variaveis para guardar a categoria atual e o resultados de buscas
let listaAtual = '';
let resultados = [];

// endereço da API local
const API = 'http://localhost:3000/api';

// quando a pagina carrega cria as estrelas de fundo, obs: uma graça
function criarGalaxia() {
  const galaxy = document.getElementById('galaxy');

  for (let i = 0; i < 250; i++) {
    const estrela = document.createElement('span');
    estrela.classList.add('estrela');

    const tamanho = Math.random() * 2.5 + 0.5;
    estrela.style.cssText = `
      width: ${tamanho}px;
      height: ${tamanho}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --dur: ${Math.random() * 4 + 2}s;
      --brilho: ${Math.random() * 0.7 + 0.3};
      animation-delay: ${Math.random() * 5}s;
    `;

    galaxy.appendChild(estrela);
  }
}

function mostrarLoading() {
  document.getElementById('loading').classList.add('visivel');
  document.getElementById('cards').innerHTML = '';
}

function esconderLoading() {
  document.getElementById('loading').classList.remove('visivel');
}

// essa é a função principal que busca os dados da minha API
async function buscar(categoria) {
  listaAtual = categoria;
  resultados = [];

  // marca o botao clicado como ativo
  document.querySelectorAll('nav button').forEach(function (btn) {
    btn.classList.remove('ativo');
  });
  event.target.classList.add('ativo');

  document.getElementById('busca').value = '';
  mostrarLoading();

  try {
    const resposta = await fetch(`${API}/${categoria}`);
    const dados = await resposta.json();

    resultados = dados;
    esconderLoading();

    // adiciona classe no container para estilo especifico por categoria
    document.getElementById('cards').className = categoria;

    renderizarCards(resultados);

  } catch (erro) {
    esconderLoading();
    document.getElementById('cards').innerHTML =
      '<p style="text-align:center;color:#8a7a9a;padding:40px">Sem sinal... a Força falhou desta vez.</p>';
  }
}

// cria os cards na tela com efeito de virar
function renderizarCards(lista) {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#8a7a9a;padding:40px">Nenhum resultado encontrado.</p>';
    return;
  }

  lista.forEach(function (item, indice) {
    const nome = item.nome || item.name || 'Desconhecido';
    const resumo = montarResumo(item, listaAtual);

    //efeito 3D funcionar
    const wrapper = document.createElement('div');
    wrapper.classList.add('card-wrapper');
    wrapper.style.animationDelay = `${indice * 0.06}s`;

    wrapper.innerHTML = `
      <div class="card">
        <div class="card-frente">
          <img
            class="card-foto"
            src="${item.imagem}"
            alt="${nome}"
            onerror="this.style.display='none'"
          >
          <h3 class="card-nome">${nome}</h3>
        </div>
        <div class="card-verso">
          <h3>${nome}</h3>
          ${resumo}
          <p style="margin-top:8px;font-size:0.75rem;color:var(--roxo-brilho);letter-spacing:1px">
            clique para detalhes
          </p>
        </div>
      </div>
    `;

    // clique abre o modal com todos os detalhes
    wrapper.addEventListener('click', function () {
      abrirModal(item);
    });

    container.appendChild(wrapper);
  });
}

// monta as informações do verso do card de acordo com a categoria
function montarResumo(item, categoria) {
  const infos = {
    personagens: [['Nascimento', item.nascimento], ['Altura', item.altura], ['Planeta', item.planeta]],
    planetas: [['Clima', item.clima], ['Terreno', item.terreno], ['População', item.populacao]],
    naves: [['Modelo', item.modelo], ['Fabricante', item.fabricante], ['Velocidade', item.velocidade]],
    veiculos: [['Modelo', item.modelo], ['Fabricante', item.fabricante], ['Velocidade', item.velocidade]],
    especies: [['Classificação', item.classificacao], ['Linguagem', item.linguagem], ['Origem', item.planeta_origem]],
    filmes: [['Episódio', item.episodio], ['Diretor', item.diretor], ['Lançamento', item.lancamento]],
  };

  const campos = infos[categoria] || [];
  return campos.map(function ([label, valor]) {
    return `<p>${label}: <span>${valor || '?'}</span></p>`;
  }).join('');
}

// abre o modal com foto grande e todos os detalhes do item
function abrirModal(item) {
  const overlay = document.getElementById('modal-overlay');
  const conteudo = document.getElementById('modal-conteudo');
  const nome = item.nome || item.name || 'Desconhecido';

  // campos que nao mostro no modal
  const camposIgnorados = ['id', 'imagem', 'nome', 'historia'];

  const campos = Object.entries(item)
    .filter(function ([chave]) {
      return !camposIgnorados.includes(chave);
    })
    .map(function ([chave, valor]) {
      const label = chave.replace(/_/g, ' ').replace(/\b\w/g, function (l) {
        return l.toUpperCase();
      });
      return `<p><strong>${label}:</strong> ${valor || '?'}</p>`;
    }).join('');

  // historia aparece destacada no final
  const historia = item.historia
    ? `<p class="historia">${item.historia}</p>`
    : '';

  conteudo.innerHTML = `
    <h2>${nome}</h2>
    <img src="${item.imagem}" alt="${nome}" onerror="this.style.display='none'">
    ${campos}
    ${historia}
  `;

  overlay.classList.add('aberto');
}

function fecharModal() {
  document.getElementById('modal-overlay').classList.remove('aberto');
}

// fecha clicando fora do modal
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) fecharModal();
});

document.getElementById('fechar-modal').addEventListener('click', fecharModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') fecharModal();
});

// filtra os cards de acordo com o que é digitado na busca
document.getElementById('busca').addEventListener('input', function () {
  const termo = this.value.toLowerCase();
  const filtrado = resultados.filter(function (item) {
    const nome = item.nome || item.name || '';
    return nome.toLowerCase().includes(termo);
  });
  renderizarCards(filtrado);
});

// inicia as estrelas quando a página carrega
criarGalaxia();
