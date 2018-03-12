import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../models/user.dto';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  user: User;

  minYear: number;
  maxYear: number;

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserService, public loadingCtrl: LoadingController) {
    this.user = this.navParams.get('user');
    let today = new Date();
    this.minYear = today.getFullYear() - 1;
    this.maxYear = today.getFullYear() + 1;
    this.formGroup = this.formBuilder.group({
      username: new FormControl({value: this.user.username, disabled: true}, [Validators.required]),
      name: new FormControl({value: this.user.name, disabled: false}, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
      enabled: new FormControl({value: this.user.enabled, disabled: false}, [Validators.required]),
      expire: new FormControl({value: this.expire(), disabled: this.expireDisabled()}, [Validators.required])
    });
  }

  save() {
    let user: User = this.formGroup.value;
    user.id = this.user.id;
    user.username = this.user.username;
    user.expire = new Date(user.expire).getTime();
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.edit(user)
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

  private expire() {
    return this.user.expire != null ? new Date(this.user.expire).toISOString() : null;
  }

  private expireDisabled() {
    return this.user.roles.indexOf('SUPER') > -1 || this.user.roles.indexOf('ADMIN') > -1;
  }

}
