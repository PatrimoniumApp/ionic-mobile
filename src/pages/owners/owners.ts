import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, PopoverController } from 'ionic-angular';

import { OwnerService } from '../../services/owner.service';
import { Owner } from '../../models/owner.dto';

@IonicPage()
@Component({
  selector: 'page-owners',
  templateUrl: 'owners.html',
})
export class OwnersPage {

  owners: Owner[];

  constructor(public navCtrl: NavController, public ownerService: OwnerService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public popoverCtrl: PopoverController) {}

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

  noOwners(): boolean {
    if (this.owners == null) {
      return true;
    }
    return this.owners.length == 0;
  }

  add() {
    this.navCtrl.push('OwnerAddPage');
  }

  options(event, owner: Owner) {
    let data = {
      owner: owner,
      callRemove: () => {
        var index = this.owners.findIndex(obj => obj.id === owner.id);
        if (index > -1) {
          this.owners.splice(index, 1);
        }
      },
      callEdit: () => {
        this.navCtrl.push('OwnerDetailPage', {owner: owner});
      }
    }
    this.popoverCtrl.create('OwnersMenuPage', {data: data})
    .present({
      ev: event
    });
  }

}