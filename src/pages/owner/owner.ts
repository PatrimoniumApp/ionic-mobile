import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { OwnerService } from '../../services/owner.service';
import { Owner } from '../../models/owner.dto';

@IonicPage()
@Component({
  selector: 'page-owner',
  templateUrl: 'owner.html',
})
export class OwnerPage {

  owners: Owner[];

  constructor(public navCtrl: NavController, public ownerService: OwnerService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.ownerService.findAll()
      .subscribe(response => {
        this.owners = response;
        loading.dismiss();
      },
      error => {loading.dismiss();}
    );
  }

  add() {
    this.navCtrl.push('OwnerAddPage');
  }

  edit(owner: Owner) {
    this.navCtrl.push('OwnerDetailPage', {owner: owner});
  }

  askRemove(owner: Owner) {
    this.alertCtrl.create({
      title: 'Confirmação',
      message: `Deseja remover o proprietário ${owner.name}?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.remove(owner);
          }
        }
      ]
    }).present();
  }

  remove(owner: Owner) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.ownerService.remove(owner)
      .subscribe(() => {
        var index = this.owners.findIndex(obj => obj.id === owner.id);
        if (index > -1) {
          this.owners.splice(index, 1);
          loading.dismiss();
        }
      },
      error => {loading.dismiss();}
    );
  }

}
