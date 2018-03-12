import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../models/user.dto';

import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Page } from '../../models/page.dto';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  user: User;

  pages: any[];

  constructor(public navCtrl: NavController, public authService: AuthService, public storage: StorageService) {}

  ionViewWillEnter() {
    this.user = this.storage.getLocalUser().user;

    let localAccess = this.storage.getLocalAccess(this.user);
    if (localAccess != null) {
      let pages = localAccess.access;
      if (pages != null) {
        pages = pages.sort(function(a, b) {
          return (a.count > b.count) ? -1 : ((b.count > a.count) ? 1 : 0);
        });
        this.pages = pages.slice(0, 2);
      }
    }
  }

  openPage(page: Page) {
    this.storage.incrementAccessCounter(this.user, page);
    this.navCtrl.push(page.component);
  }

}
