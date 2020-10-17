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
  laps: Lap[] = [];
  counter: number;
  running = false;
  startText = 'Play';
  faTrash = faTrashAlt;
  timerRef: number;

  constructor() {
    if (localStorage.getItem('startTime')) {
      this.startTimer();
    }
  }

  startTimer(): void {
    this.running = !this.running;
    if (this.running) {
      this.faPlay = faPause;
      this.startText = 'Pause';
      let startTime;
      localStorage.getItem('startTime') ? startTime = localStorage.getItem('startTime') : startTime = Date.now() - (this.counter || 0);
      localStorage.setItem('startTime', `${startTime}`);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
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
      });
    } else {
      this.faPlay = faPlay;
      this.startText = 'Play';
      localStorage.clear();
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

}



