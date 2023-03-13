/*Const Armazenada doe Mês e dias da Semana*/
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const semanas = [
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

/*Conexão com menu*/
const dataOferta = document.querySelector(".data-oferta");
const FormatData = document.querySelector(".format-data");
const itens = document.querySelectorAll(".data h4");

/* Os meses tem como base o indice zero*/
let tempData = new Date();
let tempAno = tempData.getFullYear();
let tempMes = tempData.getMonth();
let tempDia = tempData.getDate();

const futuroData = new Date(tempAno, tempMes, tempDia + 21, 16, 59, 0);

const ano = futuroData.getFullYear();
const horas = futuroData.getHours();
const minutos = futuroData.getMinutes();
let mes = futuroData.getMonth();

mes = meses[mes];
const semana = semanas[futuroData.getDay()];
const data = futuroData.getDate();
dataOferta.textContent = `Oferta termina ${semana}, dia ${data} de ${mes} de ${ano}, às ${horas}:${minutos}.`;

const futuroTime = futuroData.getTime();
function getRemaindingTime() /* obter tempo restante */ {
  const hoje = new Date().getTime();

  const t = futuroTime - hoje;
  /* 
    1s = 1000ms
    1m = 60s
    1hr = 60m
    1d = 24hr
    valor em milisegundos
    */
  const umDia = 24 * 60 * 60 * 1000;
  const umHora = 60 * 60 * 1000;
  const umMinuto = 60 * 1000;
  /* calcular todos os valores */
  let dias = t / umDia;
  dias = Math.floor(dias);
  let horas = Math.floor((t % umDia) / umHora);
  let minutos = Math.floor((t % umHora) / umMinuto);
  let segundos = Math.floor((t % umMinuto) / 1000);

  /*Matriz de valores */
  const valores = [dias, horas, minutos, segundos];
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`); // valor 0 será adicionado na frente do numeros, quando ele for menor que "10"
    }
    return item;
  }

  itens.forEach(function (item, index) {
    item.innerHTML = format(valores[index]);
  });

  if (t < 0) {
    clearInterval(contagem);
    FormatData.innerHTML = `<h4 class="expirado> Desculpe, a oferta expirou</h4>`;
  }
}
/*Contagem */
let contagem = setInterval(getRemaindingTime, 1000);
/*Valor Inicial */
getRemaindingTime();
