import { Component, Output, Input, HostListener } from '@angular/core';
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
  loopRange = [0, 16];
  beat: number = 0;
  beatForTransport: number = 0;
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

  updateBpm(bpm): void {
    this.bpm = bpm;

    if (this.playing) {
      clearInterval(this.timer);
      this.playing = false;
      this.beat = this.loopRange[0];
      this.timer = setInterval(() => this.oneBeat(), (15 / this.bpm) * 1000);
      this.playing = true;
    }
  }

  updateLoopRange(loopRange): void {
    this.loopRange = loopRange;
  }

  @HostListener('window:keydown', ['$event'])
  togglePlay(event): void {
    if (event.type === 'click' || event.keyCode === 32) {
      event.preventDefault();
      if (this.playing) {
        clearInterval(this.timer);
        this.playing = false;
        this.beat = this.loopRange[0];
      } else {
        this.beat = this.loopRange[0];
        this.timer = setInterval(() => this.oneBeat(), (15 / this.bpm) * 1000);
        this.playing = true;
        this.oneBeat();
      }
    }
  }

  oneBeat() {
    this.playSounds();
    this.incrementBeat();
  }

  playSounds() {
    const instruments = Object.keys(this.sounds);
    instruments.forEach(instrument => {
      if (this.beatLocations[instrument][this.beat]) {
        this.sounds[instrument].play()
      }
    });
  }

  incrementBeat() {
    this.beatForTransport = this.beat;

    if (this.beat === this.loopRange[1] - 1) {
      this.beat = this.loopRange[0];
    } else {
      this.beat += 1;
    }
  }

  clear() {
    Object.keys(this.sounds).forEach(instrument =>
      this.beatLocations[instrument] = Array(16).fill(false));
  }
}
