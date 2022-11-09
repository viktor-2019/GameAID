const colors = [
  'linear-gradient(90deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%',
  'linear-gradient(90deg, #d916e3 0%, #c730ec 47%, #ae46f7 100%',
  'linear-gradient(90deg, #e316d9 0%, #ec30c7 47%, #f746ae 100%',
  'linear-gradient(90deg, #f6d9e3 0%, #f0c7ec 47%, #f6aef7 100%',
  'linear-gradient(90deg, #d6d9e3 0%, #c0c7ec 47%, #e6aef7 100%',
];
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
let score = 0;
const board = document.querySelector('#board');
board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandimCircle();
  }
})
let time = 0, isFinished = false;
const maxDia = 60, minDia = 20;
const timeEl = document.querySelector('#time');


startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
 })

const timeList = document.querySelector('#time-list');
timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  } 
})

function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(time);
  createRandimCircle()
}
function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
      let current = --time;
      if (current < 10) current = `0${current}`;
      setTime(current);
    }
}
function setTime(val) {
  timeEl.innerHTML = `00:${val}`;
}
function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML =`<h1> Score: <span class = "primary"> ${score} </span> </h1>`;
  isFinished = true;
  document.addEventListener('keypress', restart);
}
function restart(e) {
  if (!isFinished) return;
  e.preventDefault();
  if (e.code.toLowerCase() === 'space') {
    document.removeEventListener('keypress', restart);
    location.reload();
  }
}

function createRandimCircle() {
  const {width, height} = board.getBoundingClientRect()
  const circle = document.createElement('div');
  const size  = randomNum(minDia, maxDia);
  const x = randomNum(0, width - size);
  const y = randomNum(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px `;
  circle.style.top =`${y}px`;
  circle.style.left = `${x}px`;
  const ind = Math.floor(randomNum(0, colors.length));

  circle.style.background = colors[ind];
  
  board.append(circle);
}

function randomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomPos() {
  return `${Math.random() * (maxDia - minDia)}px`;
}