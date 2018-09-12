import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ToastController } from "ionic-angular";
import { tap } from "rxjs/operators"
import { FcmProvider } from '../../providers/fcm/fcm';
import { SwapiProvider } from '../../providers/swapi/swapi';

@Component({
  selector: 'page-starships',
  templateUrl: 'starships.html'
})
export class StarshipsPage {
  public datos:any;

  constructor(public service: SwapiProvider, public navCtrl: NavController, public fcm: FcmProvider, public toastCtrl: ToastController) {
    this.service.getStarships();
    this.service.starships$.subscribe((data: any) => {
      this.datos = data;
    })
  }

  ionViewDidLoad() {
    this.fcm.getToken();
    this.fcm.listenToNotifications().pipe(
      tap((msg: any) => {

        let toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000,
          position: 'top'
        });

        toast.present();
        console.log('notificacion ', msg.body)
      })
    ).subscribe();
  }
}
