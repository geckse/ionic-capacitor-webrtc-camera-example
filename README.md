## This is a very simple webRTC-Example for ionic testing webRTC-Video on iOS 14.3

As you might now, the webRTC on WKWebview was very limited in the past, but it seems like apple is finally adding it.
See the whole path of tears: https://bugs.webkit.org/show_bug.cgi?id=208667

I've tried running it on iOS 14.3 Beta 2, in which it actually works. 

## Here my key-learnings for generell working with the webRTC API on iOS
* Camera & Microhpone Permission is required. But It asks for permission automatically (on iOS)
* HTTPS connection (even on localhost!) [seems crucial](https://stackoverflow.com/questions/53483975/navigator-mediadevices-getusermedia-not-working-on-ios-12-safari). 
**Otherwise** you'll get the _"NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission."_-Error or the ```navigator.mediaDevices``` object is missing entirely. 


## How to get it to work with ionic?

I didn't managed it.. currently :(

Since the "protocol" of your requests inside your app / wkwebview are for iOS:
* **Capacitor**: ```capacitor://localhost``` ...
* **Cordova (Ionic Webview)**: ```ionic://localhost``` ...

... it won't work.. I only managed to use the API with the ```https://``` on a WKWebView.. that is a huge bummer.

Since you can change the App-Server in capacitor via [config](https://capacitorjs.com/docs/config) a workaround for testing purposes can be made by changing server.url in ```capacitor.config.json``` to an external host with SSL, in which it worke like a Charm!
But I don't consider it as a viable solution, since it requires your hybrid app to be loaded entirely from an external source. Which makes it truly to a glorified Website..
