const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let isActive = false;
let startInterval = null;

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

function onStartClick() {
  if (isActive) {
    return;
  }
  isActive = true;
  refs.start.setAttribute('disabled', 'true');
  refs.stop.removeAttribute('disabled');
  refs.body.style.backgroundColor = getRandomHexColor();
  startInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(startInterval);
  isActive = false;
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}









