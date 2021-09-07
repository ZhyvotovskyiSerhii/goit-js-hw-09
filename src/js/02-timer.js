import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

const refs = {
startBtn: document.querySelector('[data-start]'),
stopBtn: document.querySelector('[data-stop]'),
daysLeft: document.querySelector('[data-days]'),
hoursLeft: document.querySelector('[data-hours]'),
minutesLeft: document.querySelector('[data-minutes]'),
secondsLeft: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', start);
refs.stopBtn.addEventListener('click', stop);
let timeSelected;
let intervalId;
refs.stopBtn.disabled = true;
refs.startBtn.disabled = true;

const options = {
   enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
      onClose(selectedDates) {
      timeSelected = Date.parse(selectedDates);
      if (timeSelected - Date.now() <= 0) {
        alert('Please choose a date in the future', { clickToClose: true });
        return;
          }
          else {
            refs.startBtn.removeAttribute(`disabled`);

          }
      },
};

flatpickr('#date-selector', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);   
  return { days, hours, minutes, seconds };
 }      

 function start() {
    intervalId = setIntervalImmediately(updateTime, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.removeAttribute(`disabled`);
 }

 function updateTime() {
  const timeLeft = timeSelected - Date.now();
  if (timeLeft <= 0) {
    clearInterval(intervalId);
    refs.startBtn.disabled = true;
    return;
  }
  const time = convertMs(timeLeft);
  changeInterface(time);
}
  
function stop() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
 clearInterval(intervalId);
 return;
}
      

      
 function changeInterface({ days, hours, minutes, seconds }) {
   refs.daysLeft.textContent = addLeadingZero(days);
   refs.hoursLeft.textContent = addLeadingZero(hours);
   refs.minutesLeft.textContent = addLeadingZero(minutes);
   refs.secondsLeft.textContent = addLeadingZero(seconds);
 }

 function addLeadingZero(value) {
   return String(value).padStart(2, '0');
 }
 
 function setIntervalImmediately(func, interval) {
   func();
   return setInterval(func, interval);
 }
 

     
     