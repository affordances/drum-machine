import { Component, OnInit, Input, Output, EventEmitter, NouisliderModule } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  @Output() updateLoopRangeEvent = new EventEmitter<any>();
  @Input() bpm: number;
  @Input() playing: boolean;
  @Input() beatLocations: any;
  @Input() loopRange: any;
  @Input() instruments: any;
  @Input() beatForTransport: number;
  loopRangeConfig: any = {
    behaviour: 'drag',
    connect: true,
    step: 1,
    start: [0, 15],
    margin: 1,
    range: {
      min: 0,
      max: 15
    },
  };

  constructor() { }

  ngOnInit() {
  }

  toggleBeat(instrument, location) {
    this.beatLocations[instrument][location] = !this.beatLocations[instrument][location];
  }
}
