const checkin = document.querySelector('.inputCheckin');
const checkout = document.querySelector('.inputCheckout');
const bedroom = document.querySelectorAll('.bedroom');
const select = document.querySelector('.nPessoas');
const textArea = document.querySelector('.obs');
const btnSubmit = document.querySelector('#submit-btn');
const btnClear = document.querySelector('#clear-btn');
const ol = document.querySelector('ol');

function getQuarto() {
  for (let i = 0; i < bedroom.length; i++) {
    if (bedroom[i].checked) {
      return bedroom[i].value;
    }
  }
}

function getPessoas() {
  return select.options[select.selectedIndex].value;
}

function getData(value) {
  const valueDate = value + 'T03:00:00.000Z'
  data = new Date(valueDate)
  dataFormatada = data.toLocaleDateString('pt-BR');
  return dataFormatada;
}

function creaitLi() {
  let li = document.createElement('li');
  li.innerText = `Reserva para o dia ${getData(checkin.value)} até o dia ${getData(checkout.value)} Quarto ${getQuarto()} - Para ${getPessoas()} Pessoas - Obs: ${textArea.value}.`;
  ol.appendChild(li);
  save();
}

btnSubmit.addEventListener('click', creaitLi)



btnClear.addEventListener('click', () => {
  let li = document.querySelectorAll('li');
  for (const iterator of li) {
    iterator.remove();
  }
  localStorage.clear('Reserva');
})

function save() {
  let li = document.querySelectorAll('li');
  let list = [];
  for (const iterator of li) {
    list.push({
      'li': iterator.innerText,
    })
  }
  localStorage.setItem('Reserva', JSON.stringify(list));
}

window.onload = () => {
  if (localStorage.getItem('Reserva') == null) {
    localStorage.setItem('Reserva', JSON.stringify([]));
  } else {
    let list = JSON.parse(localStorage.getItem('Reserva'));
    for (let i = 0; i < list.length; i += 1) {
      let li = document.createElement('li');
      li.innerText = list[i].li;
      ol.appendChild(li);
    }
  }
}