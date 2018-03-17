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
  beat: number = 0;
  hats = [false, false, false, false];
  hat = new Howl({src: ['./assets/chh.wav']});
  snares = [false, false, false, false];
  snare = new Howl({src: ['./assets/sd.wav']});
  kicks = [true, false, false, false];
  kick = new Howl({src: ['./assets/kick.wav']});

  constructor() {}

  ngOnInit() {
  }

  toggleBeat(instrument, beatLocation) {
    if (instrument === 'hats') {
      this.hats[beatLocation] = !this.hats[beatLocation];
    } else if (instrument === 'snares') {
      this.snares[beatLocation] = !this.snares[beatLocation];
    } else {
      this.kicks[beatLocation] = !this.kicks[beatLocation];
    }
  }

  updateBpm(): void {
    if (this.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.playSounds(), (15 / this.bpm) * 1000);
    }
  }

  playSounds() {
    if (this.hats[this.beat]) {
      this.hat.play();
    }
    if (this.snares[this.beat]) {
      this.snare.play();
    }
    if (this.kicks[this.beat]) {
      this.kick.play();
    }
    this.beat = (this.beat + 1) % 4;
  }

  toggle(): void {
    if (this.playing) {
      clearInterval(this.timer);
      this.playing = false;
    } else {
      this.timer = setInterval(() => this.playSounds(), (15 / this.bpm) * 1000);
      this.playing = true;
    }
    this.playSounds();
  }
}
