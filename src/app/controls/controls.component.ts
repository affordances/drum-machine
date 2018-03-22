import { Component, OnInit, Input } from '@angular/core';
import {EventsService} from '../events.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @Input() bpm: number;
  @Input() playing: boolean;
  @Input() togglePlayEvent: any;
  @Input() updateBpmEvent: any;
  @Input() clearEvent: any;

  constructor(private es: EventsService) {}

  ngOnInit() {
  }

  emitPlay(event) { this.es.togglePlayEvent.emit() }

  emitUpdateBpm() { this.es.updateBpmEvent.emit(this.bpm) }

  emitClear() { this.es.clearEvent.emit() }
}
