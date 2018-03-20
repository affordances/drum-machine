import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class EventsService {
  playSoundsEvent = new EventEmitter<any>();
  updateBpmEvent = new EventEmitter<any>();
  togglePlayEvent = new EventEmitter<any>();
  clearEvent = new EventEmitter<any>();

  constructor() {
  }
}
