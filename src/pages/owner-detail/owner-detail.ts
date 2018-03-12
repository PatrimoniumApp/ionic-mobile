import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Owner } from '../../models/owner.dto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OwnerService } from '../../services/owner.service';

@IonicPage()
@Component({
  selector: 'page-owner-detail',
  templateUrl: 'owner-detail.html',
})
export class OwnerDetailPage {

  owner: Owner;

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: OwnerService, public loadingCtrl: LoadingController) {
    this.owner = this.navParams.get('owner');
    this.formGroup = this.formBuilder.group({
      name: new FormControl({value: this.owner.name, disabled: false}, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
      document: new FormControl({value: this.owner.document, disabled: false}, [Validators.required])
    });
  }

  save() {
    let owner: Owner = this.formGroup.value;
    owner.id = this.owner.id;
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.edit(owner)
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
