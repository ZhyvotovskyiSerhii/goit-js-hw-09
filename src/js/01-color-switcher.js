import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.0.2.min.css';

const timerOn = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

let timeSelected;
let intervalId;
let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange() {
    timerOn.startBtn.removeAttribute('disabled');
  },
  onClose(selectedDates) {
    timeSelected = Date.parse(selectedDates);
  },
};

flatpickr('#date-selector', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function start() {
  if (isActive) {
    return;
  }

  if (timeSelected - Date.now() <= 0) {
    Notify.failure('Please choose a date in the future', { clickToClose: true });
    return;
  }

  intervalId = setIntervalImmediately(timeUpdate, 1000);
  isActive = true;
}

function timeUpdate() {
  const timeLeft = timeSelected - Date.now();
  if (timeLeft < 0) {
    clearInterval(intervalId);
    isActive = false;
    return;
  }
  const time = convertMs(timeLeft);
  updateInterface(time);
}

function stop() {
  isActive = false;
  clearInterval(intervalId);
}

function updateInterface({ days, hours, minutes, seconds }) {
  timerOn.daysLeft.textContent = changes(days);
  timerOn.hoursLeft.textContent = changes(hours);
  timerOn.minutesLeft.textContent = changes(minutes);
  timerOn.secondsLeft.textContent = changes(seconds);
}

function changes(value) {
  return String(value).padStart(2, '0');
}

function setIntervalImmediately(func, interval) {
  func();
  return setInterval(func, interval);
}

timerOn.startBtn.addEventListener('click', start);
timerOn.stopBtn.addEventListener('click', stop);