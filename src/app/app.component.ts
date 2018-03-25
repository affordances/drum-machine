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
  animationRunning: boolean = false;
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

  updateBpm(bpm): void {
    this.bpm = bpm;

    if (this.playing) {
      this.resetAnimationForBpmChange();
    }
  }

  @HostListener('window:keydown', ['$event'])
  togglePlay(event): void {
    if (event.type === 'click' || event.keyCode === 32) {
      event.preventDefault();
      if (this.playing) {
        clearInterval(this.timer);
        this.playing = false;
        this.animationRunning = false;
        this.beat = 0;
      } else {
        this.timer = setInterval(() => this.playSounds(), (15 / this.bpm) * 1000);
        this.playing = true;
        this.animationRunning = true;
        this.beat = 0;
        this.playSounds();
      }
    }
  }

  clear() {
    Object.keys(this.sounds).forEach(instrument =>
      this.beatLocations[instrument] = Array(16).fill(false));
  }

  incrementBeat() {
    this.beat += 1;

    if (this.beat === 17) {
      this.resetAnimation();
    }
  }

  playSounds() {
    const instruments = Object.keys(this.sounds);
    instruments.forEach(instrument => {
      if (this.beatLocations[instrument][this.beat]) {
        this.sounds[instrument].play()
      }
    });

    this.incrementBeat();
  }

  resetAnimation() {
    this.animationRunning = false;
    clearInterval(this.timer);
    setTimeout(() => {
      this.timer = setInterval(() => this.playSounds(), (15 / this.bpm) * 1000);
      this.animationRunning = true;
      this.beat = 0;
      this.playSounds();
    }, 3);
  }

  resetAnimationForBpmChange() {
    this.animationRunning = false;
    clearInterval(this.timer);
    setTimeout(() => {
      this.timer = setInterval(() => this.playSounds(), (15 / this.bpm) * 1000);
      this.animationRunning = true;
      this.beat = 0;
      this.playSounds();
    }, 3);
  }
}
