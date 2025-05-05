import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetChannelService {
  private channel: BroadcastChannel;
  private meetLinkSubject = new Subject<string>();

  meetLink$ = this.meetLinkSubject.asObservable();

  constructor(private zone: NgZone) {
    this.channel = new BroadcastChannel('meet-notif');

    this.channel.onmessage = (event) => {
      this.zone.run(() => {
        if (event.data?.type === 'NEW_MEET') {
          this.meetLinkSubject.next(event.data.link);
        }
      });
    };
  }

  sendMeetLink(link: string) {
    this.channel.postMessage({ type: 'NEW_MEET', link });
  }
}
