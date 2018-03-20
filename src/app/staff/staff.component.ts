import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @Input() beatLocations: any;
  @Input() instruments: any;

  constructor(private es: EventsService) { }

  ngOnInit() {
  }

  toggleBeat(instrument, location) {
    this.beatLocations[instrument][location] = !this.beatLocations[instrument][location];
  }
}
