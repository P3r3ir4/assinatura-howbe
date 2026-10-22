// Encontra o botão
const buttonCopiar = document.getElementById('btn-copiar');
buttonCopiar.onclick = copiar;

// Encontra os inputs
const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');
const celularInput = document.getElementById('celular');
const cargosInput = document.getElementById('cargos');

// Adiciona evento de escuta aos campos
nomeInput.addEventListener('input', btn);
sobrenomeInput.addEventListener('input', btn);
celularInput.addEventListener('input', btn);
cargosInput.addEventListener('input', btn);

// Encontra os campos a serem preenchidos na assinatura
const nomeCompletoField = document.getElementById('nome-assinatura');
const celularField = document.getElementById('celular-assinatura');
const cargoField = document.getElementById('cargo-assinatura');

function btn() {
  var nome = nomeInput.value;
  var sobrenome = sobrenomeInput.value;
  var celular = celularInput.value;
  var cargo = cargosInput.value; // Agora lê o valor direto do input de texto

  let nomeCompleto = nome + ' ' + sobrenome;

  nomeCompletoField.innerHTML = editaNome(nomeCompleto);
  celularField.innerHTML = editaCelular(celular);
  cargoField.innerHTML = cargo.trim() === '' ? 'Seu Cargo Aqui' : cargo;

  celularField.setAttribute('href', `https://wa.me/55${editaCelular(celular).replace(/[^0-9]/g, '')}`);
}

function editaNome(nome) {
  let palavras = nome.trim().split(' ');
  if (palavras.length === 1 && palavras[0] === '') {
    return 'Nome Sobrenome';
  }
  for (let i = 0; i < palavras.length; i++) {
    palavras[i] = primeirasMaiusculas(palavras[i]);
  }
  return palavras.join(' ');
}

function primeirasMaiusculas(palavra) {
  if (palavra.length > 1) {
    return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase();
  }
  return palavra.toUpperCase();
}

function editaCelular(cel) {
  cel = cel.replace(/[^0-9]/g, '');
  let n = cel.length;

  if (n === 0) {
    return '+55 99 99999-9999';
  } else if (n <= 2) {
    return `+55 (${cel}`;
  } else if (n <= 7) {
    return `+55 (${cel.slice(0, 2)}) ${cel.slice(2)}`;
  } else if (n <= 11) {
    return `+55 (${cel.slice(0, 2)}) ${cel.slice(2, 7)}-${cel.slice(7)}`;
  } else {
    return `+55 (${cel.slice(0, 2)}) ${cel.slice(2, 7)}-${cel.slice(7, 11)}`;
  }
}

function copiar() {
  var area = document.getElementById("assinatura-div");
  if (window.getSelection) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(area);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
    alert("Assinatura copiada para a área de transferência!");
  }
}