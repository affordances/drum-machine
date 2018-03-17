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
  activeBeats = [true, false, false, false];
  timer: number;
  beat: number = 0;
  sound = new Howl({src: ['./assets/click1.mp3']});

  constructor() {}

  ngOnInit() {
  }

  toggleBeat(i) {
    this.activeBeats[i] = !this.activeBeats[i];
  }

  updateBpm(): void {
    if (this.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.playClick(), (15 / this.bpm) * 1000);
    }
  }

  playClick() {
    if (this.activeBeats[this.beat]) {
      this.sound.play();
    }
    this.beat = (this.beat + 1) % 4;
  }

  toggle(): void {
    if (this.playing) {
      clearInterval(this.timer);
      this.playing = false;
    } else {
      this.timer = setInterval(() => this.playClick(), (15 / this.bpm) * 1000);
      this.playing = true;
    }
    this.playClick();
  }
}
