import { Component } from '@angular/core';
import { Howl } from 'howler';
import { EventsService } from './events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bpm = 130;
  playing = false;
  timer;
  beat = 0;
  instruments = [];
  beatLocations = {};
  sounds = {
    'open hat': new Howl({src: ['./assets/ohh.wav']}),
    'closed hat': new Howl({src: ['./assets/chh.wav']}),
    'snare': new Howl({src: ['./assets/sd.wav']}),
    'kick': new Howl({src: ['./assets/kick.wav']})
  };

  constructor(private es: EventsService) {
    Object.keys(this.sounds).forEach(instrument =>
      this.beatLocations[instrument] = Array(16).fill(false));

    this.beatLocations['kick'][0] = true;
    this.beatLocations['kick'][4] = true;
    this.beatLocations['kick'][8] = true;
    this.beatLocations['kick'][12] = true;

    this.instruments = Object.keys(this.sounds);
  }

  updateBpm(): void {
    if (this.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.es.playSoundsEvent.emit(), (15 / this.bpm) * 1000);
    }
  }

  togglePlay(event): void {
    if (!event || event.keyCode === 32) {
      if (this.playing) {
        alert('stopping')
        clearInterval(this.timer);
        this.playing = false;
        this.beat = 0;
      } else {
        alert('playing')
        this.timer = setInterval(() => this.es.playSoundsEvent.emit(), (15 / this.bpm) * 1000);
        this.playing = true;
        this.beat = 0;
        this.es.playSoundsEvent.emit();
      }
    }
  }

  clear() {
    Object.keys(this.sounds).forEach(instrument =>
      this.beatLocations[instrument] = Array(16).fill(false));
  }

  playSounds() {
    const instruments = Object.keys(this.sounds);
    instruments.forEach(instrument => {
      if (this.beatLocations[instrument][this.beat]) {
        this.sounds[instrument].play();
      }
    });
    this.beat = (this.beat + 1) % 16;
  }
}
