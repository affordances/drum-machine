import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Howl } from "howler";

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
  instruments = [];
  beatLocations = {};
  sounds = {
    "Closed Hat": new Howl({src: ['./assets/chh.wav']}),
    "Snare": new Howl({src: ['./assets/sd.wav']}),
    "Kick": new Howl({src: ['./assets/kick.wav']})
  };

  constructor() {
    Object.keys(this.sounds).forEach(instrument =>
      this.beatLocations[instrument] = Array(16).fill(false));

    this.instruments = Object.keys(this.sounds);
  }

  ngOnInit() {
  }

  toggleBeat(instrument, location) {
    this.beatLocations[instrument][location] = !this.beatLocations[instrument][location];
  }

  updateBpm(): void {
    if (this.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.playSounds(), (15 / this.bpm) * 1000);
    }
  }

  playSounds() {
    const instruments = Object.keys(this.sounds);
    instruments.forEach(instrument => {
      if (this.beatLocations[instrument][this.beat]) {
        this.sounds[instrument].play()
      }
    });
    this.beat = (this.beat + 1) % 16;
  }

  toggle(event): void {
    console.log(event);
    if (!event || event.keyCode === 32) {
      if (this.playing) {
        clearInterval(this.timer);
        this.playing = false;
        this.beat = 0;
      } else {
        this.timer = setInterval(() => this.playSounds(), (15 / this.bpm) * 1000);
        this.playing = true;
        this.playSounds();
      }
    }
  }

  clear() {
    Object.keys(this.sounds).forEach(instrument =>
      this.beatLocations[instrument] = Array(16).fill(false));
  }
}
