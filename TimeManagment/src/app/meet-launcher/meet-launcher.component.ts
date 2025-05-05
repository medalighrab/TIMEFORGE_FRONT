import { Component } from '@angular/core';
import { MeetChannelService } from '../services/meet-channel.service';
import { MyServiceService } from '../services/my-service.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-meet-launcher',
templateUrl: './meet-launcher.component.html',
  styleUrls: ['./meet-launcher.component.css']
})
export class MeetLauncherComponent {
   meetUrl: SafeResourceUrl;
  
    constructor(private myService: MyServiceService, private fb: FormBuilder, private http: HttpClient,private sanitizer: DomSanitizer, 
  ) { 
      const url = 'https://meet.jit.si/mmmmmmmmmmmmeeeeeeeeeeeeeetttttt';
      this.meetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
     
    }
    
  ngOnInit(): void {
   
  const roomName = 'nomDeLaReunion'; // 🔁 à remplacer dynamiquement par une vraie valeur
  const url = `https://meet.jit.si/${roomName}`;
  }

    


 
}
