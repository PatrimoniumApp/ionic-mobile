import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { RealStateService } from '../../services/real-state.service';
import { RealState } from '../../models/real-state.dto';
import { Owner } from '../../models/owner.dto';
import { OwnerService } from '../../services/owner.service';

@IonicPage()
@Component({
  selector: 'page-real-state-add',
  templateUrl: 'real-state-add.html',
})
export class RealStateAddPage {

  formGroup: FormGroup;

  owners: Owner[] = [];

  owner: Owner;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public realStateService : RealStateService, public ownerService: OwnerService, public loadingCtrl: LoadingController) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
      registration: new FormControl({value: '', disabled: false}, [Validators.required]),
      ownerId: new FormControl({value: '', disabled: false}, [Validators.required])
    });
  }

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

  save() {
    let realState: RealState = this.formGroup.value;
    let loading = this.loadingCtrl.create();
    loading.present();
    this.realStateService.insert(realState)
      .subscribe(
        response => {
          loading.dismiss();
          this.navCtrl.pop();
        },
        error => {loading.dismiss();}
      );
  }

  back() {
    this.navCtrl.pop();
  }

}
