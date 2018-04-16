import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController, AlertController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.dto';

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>{{ user?.name }}</ion-list-header>
      <button ion-item (click)="edit()">
        <ion-avatar item-start>
          <img src="assets/imgs/icons/edit-small.png" />
        </ion-avatar>
        Editar
      </button>
      <button ion-item (click)="askRemove()">
        <ion-avatar item-start>
          <img src="assets/imgs/icons/eraser-small.png" />
        </ion-avatar>
        Remover
      </button>
    </ion-list>
  `
})
export class UsersMenuPage {

  user: User = {id: null, username: null, name: null, enabled: false, expire: null, roles: null};

  callRemove: any;

  callEdit: any;
  
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public userService: UserService) {
    let data = this.navParams.get('data');
    this.user = data.user;
    this.callRemove = data.callRemove;
    this.callEdit = data.callEdit;
  }

  edit() {
    this.callEdit();
    this.close();
  }

  askRemove() {
    this.alertCtrl.create({
      title: 'Confirmação',
      message: `Deseja remover o usuário ${this.user.name}?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.remove();
          }
        }
      ]
    }).present();
  }

  remove() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.remove(this.user)
      .subscribe(() => {
        this.close();
        loading.dismiss();
        this.callRemove();
      },
      error => {this.close(); loading.dismiss();}
    );
  }

  close() {
    this.viewCtrl.dismiss();
  }
}