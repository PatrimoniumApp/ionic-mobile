import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, AlertController } from 'ionic-angular';

import { Credentials } from '../../models/credentials.dto';

import { AuthService } from '../../services/auth.service';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  credentials: Credentials = { username: "", password: "" };

  constructor(public authService: AuthService, public navCtrl: NavController, public menuCtrl: MenuController, public loadingCtrl: LoadingController, public alertCtrl: AlertController) { }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(false);
    if (this.authService.isLogged()) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.authService.refreshToken()
        .subscribe(
          response => {
            this.authService.login(response.headers.get('Authorization'));
            setTimeout(() => {
              loading.dismiss();
              this.navCtrl.setRoot(TabsPage);
            }, 1200);
          },
          error => { loading.dismiss(); }
        );
    }
  }

  ionViewDidLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  login() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.authenticate(this.credentials)
      .subscribe(
        response => {
          this.authService.login(response.headers.get('Authorization'));
          setTimeout(() => {
            loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
          }, 1200);
        },
        error => {loading.dismiss();}
      );
  }

}
