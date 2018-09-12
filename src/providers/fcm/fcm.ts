import { Injectable } from '@angular/core';
import { Firebase } from "@ionic-native/firebase";
import { Platform } from "ionic-angular";
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable() 

export class FcmProvider {
 
  constructor(public firebaseNative: Firebase, public asf: AngularFirestore, private paltform: Platform) {

  }

  async getToken() {
    let token;
    if (this.paltform.is('android')) {
      token = await this.firebaseNative.getToken()
    }

    if (this.paltform.is('ios')) {
      token = await this.firebaseNative.getToken();
      //const perm = await this.firebaseNative.grantPermission();
    }

    if (!this.paltform.is('cordova')) {

    }

    return this.saveToken(token);
  }

  saveToken(token) {
    if (!token) return;

    const devicesref = this.asf.collection('devices');

    const docData = {
      token,
      userId: "testUser",
    }

    return devicesref.doc(token).set(docData);

  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }
}
