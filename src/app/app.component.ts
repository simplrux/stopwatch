import { Component } from '@angular/core';
import { faPlay, faStopwatch, faPause, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Lap } from './models/lap.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  faPlay = faPlay;
  faStopWatch = faStopwatch;

  minutes: string | number = '00';
  seconds: string | number = '00';
  milliseconds: string | number = '00';
  counter: number;
  running = false;
  startText = 'Play';
  faTrash = faTrashAlt;
  timerRef: number;
  laps: Lap[];
  startTime = Number(localStorage.getItem('startTime')) || 0;

  constructor() {

    // unless the stopwatch records and timer is cleared, the app state remains completely the same

    if (localStorage.getItem('running') === 'true') {
      this.startTimer(true);
    }
    if (localStorage.getItem('counter')) {
      this.count(Number(localStorage.getItem('counter')));
    }
    localStorage.getItem('laps') ? this.laps = JSON.parse(localStorage.getItem('laps')) : this.laps = [];
  }

  startTimer(resume: boolean): void {
    this.running = !this.running;
    if (this.running) {
      this.faPlay = faPause;
      this.startText = 'Pause';
      localStorage.setItem('running', 'true');
      if (!resume) {
        this.startTime = Date.now() - (this.counter || 0);
        localStorage.setItem('startTime', `${this.startTime}`);
      }
      this.timerRef = setInterval(() => {
        this.count();
      });
    } else {
      this.faPlay = faPlay;
      this.startText = 'Play';
      localStorage.setItem('running', 'false');
      localStorage.setItem('counter', `${this.counter}`);
      clearInterval(this.timerRef);
    }
    return;
  }

  lapTimeSplit(): void {
    if (this.counter) {
      const lapTime: Lap = {
        minutes: this.minutes,
        seconds: this.seconds,
        milliseconds: this.milliseconds
      };
      this.laps.push(lapTime);
      localStorage.setItem('laps', JSON.stringify(this.laps));
    }
    return;
  }

  count(counter?: number): void {
    counter ? this.counter = counter : this.counter = Date.now() - this.startTime;
    this.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
    this.minutes = Math.floor(this.counter / 60000);
    this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
    if (Number(this.minutes) < 10) {
      this.minutes = '0' + this.minutes;
    } else {
      this.minutes = '' + this.minutes;
    }
    if (Number(this.milliseconds) < 10) {
      this.milliseconds = '0' + this.milliseconds;
    } else {
      this.milliseconds = '' + this.milliseconds;
    }
    if (Number(this.seconds) < 10) {
      this.seconds = '0' + this.seconds;
    } else {
      this.seconds = '' + this.seconds;
    }
    return;
  }

  clearTimer(): void {
    localStorage.clear();
    this.faPlay = faPlay;
    this.running = false;
    this.startText = 'Play';
    this.counter = null;
    this.milliseconds = '00';
    this.seconds = '00';
    this.minutes = '00';
    this.laps = [];
    clearInterval(this.timerRef);
  }

  remove(i: number) {
    this.laps.splice(i, 1);
    localStorage.setItem('laps', JSON.stringify(this.laps));
  }

}



