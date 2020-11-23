import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Plugins, PermissionType } from "@capacitor/core"
const { Permissions , Camera } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('stream', {static: false}) videoEle: ElementRef;
  video: HTMLVideoElement; // live stream in html video element

  constructor() {}

  ngOnInit(){
    this.startCamera();
  }

  /*
    Start Camera
  */
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
        /*video: {
          aspectRatio: VIDEO_WIDTH / VIDEO_HEIGHT,
          frameRate: { ideal: 30 },
          width: { min: VIDEO_WIDTH/2, ideal: VIDEO_WIDTH },
          height: { min: VIDEO_HEIGHT/2, ideal: VIDEO_HEIGHT },
          facingMode: { ideal: "user" }
        },*/
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

  }

}
