import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { OwnerService } from '../../services/owner.service';
import { Owner } from '../../models/owner.dto';

@IonicPage()
@Component({
  selector: 'page-owner-add',
  templateUrl: 'owner-add.html',
})
export class OwnerAddPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public ownerService : OwnerService, public loadingCtrl: LoadingController) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
      document: new FormControl({value: '', disabled: false}, [Validators.required])
    });
  }

  save() {
    let owner: Owner = this.formGroup.value;
    let loading = this.loadingCtrl.create();
    loading.present();
    this.ownerService.insert(owner)
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
