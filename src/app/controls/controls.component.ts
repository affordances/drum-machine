import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @Input() bpm: number;
  @Input() playing: boolean;

  ngOnInit() {
  }
}
