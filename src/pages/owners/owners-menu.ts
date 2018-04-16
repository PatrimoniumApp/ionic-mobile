import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController, AlertController, LoadingController } from 'ionic-angular';
import { Owner } from '../../models/owner.dto';
import { OwnerService } from '../../services/owner.service';

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>{{ owner?.name }}</ion-list-header>
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
      <button ion-item (click)="close()">
        <ion-avatar item-start>
          <img src="assets/imgs/icons/assets-small.png" />
        </ion-avatar>
        Bens
      </button>
    </ion-list>
  `
})
export class OwnersMenuPage {

  owner: Owner = {id: null, name: null, document: null};

  callRemove: any;

  callEdit: any;
  
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ownerService: OwnerService) {
    let data = this.navParams.get('data');
    this.owner = data.owner;
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
      message: `Deseja remover o proprietário ${this.owner.name}?`,
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
    this.ownerService.remove(this.owner)
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