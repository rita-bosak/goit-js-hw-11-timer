'use strict';

const refs = {
  clock: document.querySelector('#timer-1'),
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
  }

  start() {
    let currentDate = Date.now();

    if (this.targetDate <= currentDate) {
      return;
    }

    this.intervalId = setInterval(() => {
      if (this.targetDate <= currentDate) {
        return;
      }

      this.targetDate = this.targetDate;
      currentDate = Date.now();
      const deltaTime = this.targetDate - currentDate;
      const time = getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

const timer = new CountdownTimer({
  selector: refs.clock,
  targetDate: new Date('Dec 31, 2021'),
  onTick: updateClockComponents,
});

timer.start();

function updateClockComponents({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );

  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}
