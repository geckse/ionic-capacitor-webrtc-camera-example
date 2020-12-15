import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Plugins, PermissionType, Capacitor } from "@capacitor/core"
const { Permissions , Camera, Browser, Filesystem } = Plugins;
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('stream', {static: false}) videoEle: ElementRef;
  video: HTMLVideoElement; // live stream in html video element

  page: string = "";
  win: any;

  constructor(private dom:DomSanitizer, private http: HttpClient, private iab: InAppBrowser) {}

  ngOnInit(){
    console.log("START");



    console.log('get html');

    this.http.get('assets/rtc/index.html', { responseType: 'text' }).subscribe((response) => {
      this.page = response;
      console.log(window.location.href);
      console.log(response);
        console.log('prep browser');
        setTimeout(()=>{
          console.log('open browser');
          this.win = this.iab.create("data:text/html;charset=utf-8,"+this.page, "_blank", "location=no,usewkwebview=yes");
          console.log(this.win);

              this.win.executeScript(
                  { code: 'document.body.innerHTML = "Fame for the frame "+window.location.href+" - "+(typeof window.navigator.mediaDevices);' }
              );

          this.win.show();
        },1200)

    });


    /*
    Browser.open({ url: 'https://dev.geckse.de/webrtc', presentationStyle: 'popover' }).then(()=>{
      // test
    }); */

    //this.startCamera();
  }

  /*
    Start Camera
  */ /*
  async startCamera(){


      // check prequisites
      let loc = window.location;
      console.log(loc);

      // Check Permissions
      let permissionCamera = await Permissions.query({ name: PermissionType.Camera });
      let permissionMicrophone = await Permissions.query({ name: PermissionType.Microphone });

      if(permissionCamera.state != 'granted' && permissionMicrophone.state != 'granted'){
        console.error("Web-RTC-Cam: You might need to handle permissions on your device with Capacitor Plugins which prompt and grant these rights.");
      }

      this.video = this.videoEle.nativeElement;

      const constraints = {
        video: true,
        audio: true
      };

      this.video.setAttribute('autoplay', '');
      this.video.setAttribute('muted', '');
      this.video.setAttribute('playsinline', '');

      navigator.mediaDevices.getUserMedia(constraints).then((stream: MediaStream) => {
        this.video.srcObject = stream;
        this.video.play();
      });

  }*/

}
