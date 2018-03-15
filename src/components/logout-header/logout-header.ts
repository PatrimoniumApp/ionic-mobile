import { Component, Input, OnInit } from '@angular/core';
import { App, NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'logout-header',
  templateUrl: 'logout-header.html'
})
export class LogoutHeaderComponent implements OnInit {

  @Input() title: string;

  private navCtrl: NavController;

  constructor(public app: App, public authService: AuthService, public alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.navCtrl = this.app.getRootNavs()[0];
  }

  askLogout() {
    this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.logout();
          }
        }
      ]
    }).present();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot('HomePage');
  }

}
