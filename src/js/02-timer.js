import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
  enableTime: true,  /* enableTime	Boolean	false	Enables time picker */
  time_24hr: true, /* time_24hr	boolean	false	Displays time picker in 24 hour mode without AM/PM selection when enabled. */
  defaultDate: new Date(), /* defaultDate	String	null	Sets the initial selected date(s).
If you're using mode: "multiple" or a range calendar supply an Array of Date objects or an Array of date strings which follow your dateFormat.
Otherwise, you can supply a single Date object or a date string. */
  minuteIncrement: 1, /* minuteIncrement	Integer	5	Adjusts the step for the minute input (incl. scrolling) */
  onClose(selectedDates) {  /* onClose	Function, [functions]	null	Function(s) to trigger on every time the calendar is closed. See Events API */
    onInputDate(selectedDates[0]);
  },
};

refs = {
  start: document.querySelector('button[data-start]'),
  secondsEl: document.querySelector('[data-seconds]'),
  minutesEl: document.querySelector('[data-minutes]'),
  hoursEl: document.querySelector('[data-hours]'),
  daysEl: document.querySelector('[data-days]'),
  inputDateEl: document.querySelector('#datetime-picker'),

}
console.log(refs)
const fp = flatpickr('#datetime-picker', options);
refs.start.setAttribute('disabled', 'disabled');
let timeId = null;
const INTERVAL = 1000;

/** functions */
function onInputDate(selectedDates) {
  if (selectedDates <= Date.now()) {
    // alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.start.removeAttribute('disabled', 'disabled');
    onStartedTimer(selectedDates);
  }
}

function onStartedTimer(selectedDates) {
  let timerValueInMs = Date.parse(selectedDates) - Date.now();
  let objTimerValue = convertMs(timerValueInMs);
  refs.start.addEventListener('click', () => {
    refs.start.setAttribute('disabled', 'disabled');
    refs.inputDateEl.setAttribute('disabled', 'disabled');
    timeId = setInterval(() => {
      if (timerValueInMs <= 0) {
        clearInterval(timeId);
        return;
      }
      objTimerValue = convertMs(timerValueInMs);
      refs.daysEl.textContent = addLeadingZero(objTimerValue.days);
      refs.hoursEl.textContent = addLeadingZero(objTimerValue.hours);
      refs.minutesEl.textContent = addLeadingZero(objTimerValue.minutes);
      refs.secondsEl.textContent = addLeadingZero(objTimerValue.seconds);
      timerValueInMs -= INTERVAL;
    }, INTERVAL);
  });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

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