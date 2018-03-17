import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Howl, Howler } from "howler";

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent {
  bpm: number = 130;
  playing: boolean = false;
  isFlashing = [true, false, false, false];
  beatsPerMeasure: number = 4;
  count: number = 0;
  timer: number;
  flasher: number;
  sound = new Howl({src: ['./assets/click1.mp3']});

  constructor() {}

  ngOnInit() {
  }

  setAccent(index) {
    this.isFlashing[index - 1] = !this.isFlashing[index - 1];
  }

  updateBpm(): void {
    if (this.playing) {
      clearInterval(this.timer);
      clearInterval(this.flasher);
      this.timer = setInterval(() => this.playClick(), (15 / this.bpm) * 1000);
      this.flasher = setInterval(() => this.flash(), (15 / this.bpm) * 1000);
    }
  }

  flash() {
    this.isFlashing = true;
    setTimeout(() => {this.isFlashing = false}, 150);
  }

  playClick() {
    this.sound.play();
  }

  toggle(): void {
    if (this.playing) {
      clearInterval(this.timer);
      clearInterval(this.flasher);
      this.playing = false;
      this.isFlashing = false;
    } else {
      this.timer = setInterval(() => this.playClick(), (60 / this.bpm) * 1000);
      this.flasher = setInterval(() => this.flash(), (60 / this.bpm) * 1000);
      this.playing = true;
    }
  }
}
