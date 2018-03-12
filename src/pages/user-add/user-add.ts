import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.dto';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-user-add',
  templateUrl: 'user-add.html',
})
export class UserAddPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public userService : UserService, public loadingCtrl: LoadingController) {
    this.formGroup = this.formBuilder.group({
      username: new FormControl({value: '', disabled: false}, [Validators.required]),
      name: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    });
  }

  save() {
    let user: User = this.formGroup.value;
    user.expire = new Date(user.expire).getTime();
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.insert(user)
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
