import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    margin: 2,
    range: {
      min: 0,
      max: 16
    }
  };

  constructor() { }

  ngOnInit() {
  }

  toggleBeat(instrument, location) {
    this.beatLocations[instrument][location] = !this.beatLocations[instrument][location];
  }
}
