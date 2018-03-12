import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../models/user.dto';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  users: User[];

  constructor(public navCtrl: NavController, public userService: UserService, public storage: StorageService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.findAll()
      .subscribe(response => {
        this.users = response;
        loading.dismiss();
      },
      error => {loading.dismiss();}
    );
  }

  add() {
    this.navCtrl.push('UserAddPage');
  }

  edit(user: User) {
    this.navCtrl.push('UserDetailPage', {user: user});
  }

  askRemove(user: User) {
    this.alertCtrl.create({
      title: 'Confirmação',
      message: `Deseja remover o usuário ${user.name}?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.remove(user);
          }
        }
      ]
    }).present();
  }

  remove(user: User) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.remove(user)
      .subscribe(() => {
        var index = this.users.findIndex(obj => obj.id === user.id);
        if (index > -1) {
          this.users.splice(index, 1);
          loading.dismiss();
        }
      },
      error => {loading.dismiss();}
    );
  }

  isSameUser(user: User) : boolean {
    return this.storage.getLocalUser().user.id === user.id;
  }

}
