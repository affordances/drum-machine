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
  timer: number;
  sound = new Howl({src: ['./assets/click1.mp3']});

  constructor() {}

  ngOnInit() {
  }

  updateBpm(bpm: number): void {
    if (this.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.playClick(), (60 / this.bpm) * 1000);
    }
  }

  playClick() {
    this.sound.play();
  }

  toggle(): void {
    if (this.playing) {
      clearInterval(this.timer);
      this.playing = false;
    } else {
      this.timer = setInterval(() => this.playClick(), (60 / this.bpm) * 1000);
      this.playing = true;
    }
  }
}
