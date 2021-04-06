## Tl,dr: on iOS 14.5 it will work as expected!

## This is a very simple webRTC-Example for ionic testing webRTC-Video on iOS 14.3

As you might now, the webRTC on WKWebview was very limited in the past, but it seems like apple is finally adding it.
See the whole path of tears: https://bugs.webkit.org/show_bug.cgi?id=208667

I've tried running it on iOS 14.3 Beta 2, in which it kind-of works, but not in an production environment. In iOS 14.5 it works without any hackery. 

## Here are my key-learnings for generell working with the webRTC API on iOS
* Camera & Microhpone Permission is required. But It prompts for permission automatically (on iOS). Make sure you don't forget your **p-list** entries!
* **HTTPS** connection for your webapp in web [seems crucial](https://stackoverflow.com/questions/53483975/navigator-mediadevices-getusermedia-not-working-on-ios-12-safari) ~~(even on localhost!).~~ [(They patched that in iOS 14.5 Beta2!)](https://bugs.webkit.org/show_bug.cgi?id=220184) So it's not needed on locahost. Which means a wrapped wkwebview app will work just fine.

If your environment is not matching these requirements, you'll get the following error: _"NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission."_-Error or the ```navigator.mediaDevices``` object is missing entirely. Which should be the thing for wkwebview on any iOS lower than iOS 14.5.

## How to get it to work with ionic?

[Since it's no longer required by wkwebview](https://trac.webkit.org/changeset/271229/webkit) to run in a localhost-context with ```https://``` **it'll work as expected on >= iOS 14.5 Beta 2!**

Old info:
Since the "protocol" of your requests inside your app / wkwebview are for iOS:
* **Capacitor**: ```capacitor://localhost``` ...
* **Cordova (Ionic Webview)**: ```ionic://localhost``` ...

~~... it won't work.. I only managed to use the API with the ```https://``` on a WKWebView.. that is a huge bummer.~~
No problems here with wkwebview on iOS 14.5.
