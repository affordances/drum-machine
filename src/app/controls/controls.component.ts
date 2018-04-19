import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @Input() bpm: number;
  @Input() playing: boolean;
  @Output() updateBpmEvent = new EventEmitter<any>();
  @Output() clearEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<any>();
  @Output() togglePlayEvent = new EventEmitter<any>();
  @Output() randomizeLoopEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }
}
