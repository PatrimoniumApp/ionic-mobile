import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, PopoverController } from 'ionic-angular';
import { RealState } from '../../models/real-state.dto';
import { RealStateService } from '../../services/real-state.service';

@IonicPage()
@Component({
  selector: 'page-real-states',
  templateUrl: 'real-states.html',
})
export class RealStatesPage {

  realStates: RealState[];

  constructor(public navCtrl: NavController, public realStateService: RealStateService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public popoverCtrl: PopoverController) {}

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.realStateService.findAll()
      .subscribe(response => {
        this.realStates = response;
        loading.dismiss();
      },
      error => {loading.dismiss();}
    );
  }

  noRealStates(): boolean {
    if (this.realStates == null) {
      return true;
    }
    return this.realStates.length == 0;
  }

  add() {
    this.navCtrl.push('RealStateAddPage');
  }

  options(event, realState: RealState) {
    let data = {
      realState: realState,
      callRemove: () => {
        var index = this.realStates.findIndex(obj => obj.id === realState.id);
        if (index > -1) {
          this.realStates.splice(index, 1);
        }
      },
      callEdit: () => {
        this.navCtrl.push('RealStateDetailPage', {realState: realState});
      }
    }
    this.popoverCtrl.create('RealStatesMenuPage', {data: data})
    .present({
      ev: event
    });
  }

}
