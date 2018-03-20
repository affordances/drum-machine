import { Component } from '@angular/core';
import { Howl } from "howler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bpm: number = 130;
  playing: boolean = false;
  timer: number;
  beat: number = 0;
  instruments = [];
  beatLocations = {};
  sounds = {
    "open hat": new Howl({src: ['./assets/ohh.wav']}),
    "closed hat": new Howl({src: ['./assets/chh.wav']}),
    "snare": new Howl({src: ['./assets/sd.wav']}),
    "kick": new Howl({src: ['./assets/kick.wav']})
  };

  constructor() {
    Object.keys(this.sounds).forEach(instrument =>
      this.beatLocations[instrument] = Array(16).fill(false));

    this.beatLocations["kick"][0] = true;
    this.beatLocations["kick"][4] = true;
    this.beatLocations["kick"][8] = true;
    this.beatLocations["kick"][12] = true;

    this.instruments = Object.keys(this.sounds);
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
}
