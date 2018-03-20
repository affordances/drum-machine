import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @Input() beatLocations: any;

  constructor() { }

  ngOnInit() {
  }

  toggleBeat(instrument, location) {
    this.beatLocations[instrument][location] = !this.beatLocations[instrument][location];
  }
}
