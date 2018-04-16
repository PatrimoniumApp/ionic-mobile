import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController, AlertController, LoadingController } from 'ionic-angular';
import { RealState } from '../../models/real-state.dto';
import { RealStateService } from '../../services/real-state.service';

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>{{ realState?.name }}</ion-list-header>
      <button ion-item (click)="edit()">
        <ion-avatar item-start>
          <img src="realStates/imgs/icons/edit-small.png" />
        </ion-avatar>
        Editar
      </button>
      <button ion-item (click)="askRemove()">
        <ion-avatar item-start>
          <img src="realStates/imgs/icons/eraser-small.png" />
        </ion-avatar>
        Remover
      </button>
      <button ion-item (click)="archives()">
        <ion-avatar item-start>
          <img src="realStates/imgs/icons/archive-small.png" />
        </ion-avatar>
        Arquivos
      </button>
    </ion-list>
  `
})
export class RealStatesMenuPage {

  realState: RealState = {id: null, name: null, registration: null, ownerId: null};

  callRemove: any;

  callEdit: any;
  
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public realStateService: RealStateService) {
    let data = this.navParams.get('data');
    this.realState = data.realState;
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
      message: `Deseja remover o bem ${this.realState.name}?`,
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
    this.realStateService.remove(this.realState)
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