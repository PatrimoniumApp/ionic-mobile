import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, PopoverController } from 'ionic-angular';
import { User } from '../../models/user.dto';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  users: User[];

  constructor(public navCtrl: NavController, public userService: UserService, public storage: StorageService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public popoverCtrl: PopoverController) {}

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

  noUsers(): boolean {
    if (this.users == null) {
      return true;
    }
    return this.users.length == 0;
  }

  add() {
    this.navCtrl.push('UserAddPage');
  }

  isSameUser(user: User) : boolean {
    return this.storage.getLocalUser().user.id === user.id;
  }

  options(event, user: User) {
    let data = {
      user: user,
      callRemove: () => {
        var index = this.users.findIndex(obj => obj.id === user.id);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      },
      callEdit: () => {
        this.navCtrl.push('UserDetailPage', {user: user});
      }
    }
    this.popoverCtrl.create('UsersMenuPage', {data: data})
    .present({
      ev: event
    });
  }

}
