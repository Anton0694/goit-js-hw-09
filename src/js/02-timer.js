import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onInputDate(selectedDates[0]);
  },
};
const fp = flatpickr('#datetime-picker', options);
refs.buttonStartEl.setAttribute('disabled', 'disabled');
let timeId = null;
const INTERVAL = 1000;
/** functions */
function onInputDate(selectedDates) {
  if (selectedDates <= Date.now()) {
    // alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.buttonStartEl.removeAttribute('disabled', 'disabled');
    onStartedTimer(selectedDates);
  }
}
function onStartedTimer(selectedDates) {
  let timerValueInMs = Date.parse(selectedDates) - Date.now();
  let objTimerValue = convertMs(timerValueInMs);
  refs.buttonStartEl.addEventListener('click', () => {
    refs.buttonStartEl.setAttribute('disabled', 'disabled');
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