import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggle(event): void {
    if (!event || event.keyCode === 32) {
      if (this.playing) {
        clearInterval(this.timer);
        this.playing = false;
        this.beat = 0;
      } else {
        this.timer = setInterval(() => this.playSounds(), (15 / this.bpm) * 1000);
        this.playing = true;
        this.beat = 0;
        this.playSounds();
      }
    }
  }

  clear() {
    Object.keys(this.sounds).forEach(instrument =>
      this.beatLocations[instrument] = Array(16).fill(false));
  }
}
