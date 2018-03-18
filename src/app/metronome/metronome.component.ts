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
  beatLocations = {};
  sounds = {
    hat: new Howl({src: ['./assets/chh.wav']}),
    snare: new Howl({src: ['./assets/sd.wav']}),
    kick: new Howl({src: ['./assets/kick.wav']})
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
