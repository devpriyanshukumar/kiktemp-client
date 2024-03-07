import { Injectable } from '@angular/core';
import { Subject, Subscription, filter, map } from 'rxjs';

//  * This class acting as event service bus for the entire app.
//  * No Need to register the class as this registered in the root level.
//  * Can just inject to components.

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private _handler: Subject<Message> = new Subject<Message>();

  broadcast(type: string, payload: any = null) {
    this._handler.next({ type, payload });
  }

  subscribe(type: string, callback: (payload: any) => void): Subscription {
    return this._handler
      .pipe(filter(message => message.type === type), map(message => message.payload)).subscribe(callback);
  }
}

interface Message {
  type: string;
  payload: any;
}