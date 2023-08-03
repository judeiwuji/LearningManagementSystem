import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  constructor(private http: HttpClient) {}

  loadScript() {
    return new Promise((resolve, reject) => {
      if ((window as any).JitsiMeetExternalAPI) {
        resolve(true);
      }

      const script = document.createElement('script');
      const head = document.querySelector('head');
      script.src = 'https://meet.jit.si/external_api.js';
      head?.append(script);

      script.onload = () => {
        resolve(true);
      };
    });
  }
}
