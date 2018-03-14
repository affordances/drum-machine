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
  click: string = './click1.wav';

  constructor() {}

  ngOnInit() {
  }

  changeBpm(bpm: number): void {
    this.bpm = bpm;
  }

  toggle(): void {
    let sound = new Howl({
      src: [this.click]
    });

    sound.play();
  }
}
