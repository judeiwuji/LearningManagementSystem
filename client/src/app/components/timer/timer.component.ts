import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input()
  duration: number = 10;

  @Input()
  key = '__app_timer';

  @Output()
  onTimeOver = new EventEmitter<boolean>();

  hours = 0;
  minutes = 0;
  seconds = 0;
  timerInterval: any;

  constructor(private readonly cookieService: CookieService) {}

  ngOnInit(): void {
    this.initTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  initTimer() {
    const base = 1000 * 60 * 60;
    const milliseconds =
      Number(this.cookieService.get(this.key)) || this.duration * 60000;

    this.hours = Math.floor(milliseconds / base);
    this.minutes = Math.floor((milliseconds / base - this.hours) * 60);
    this.seconds = Math.floor(
      ((milliseconds / base - this.hours) * 60 - this.minutes) * 60
    );

    this.timerInterval = setInterval(() => {
      if (this.minutes === 0 && this.hours > 0) {
        this.minutes = 60;
        this.hours -= 1;
      }

      if (this.seconds === 0 && this.minutes > 0) {
        this.seconds = 60;
        this.minutes -= 1;
      }

      this.seconds -= 1;
      if (this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
        this.onTimeOver.emit(true);
        clearInterval(this.timerInterval);
      }

      const milliseconds =
        this.hours * 60 * 60 * 1000 +
        this.minutes * 60 * 1000 +
        this.seconds * 1000;
      this.setTimer(milliseconds);
    }, 1000);
  }

  setTimer(milliseconds: number) {
    var d = new Date();
    d.setTime(d.getTime() + milliseconds);
    this.cookieService.set(this.key, `${milliseconds}`, d, '/');
  }
}
