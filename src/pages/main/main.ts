import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';

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

  @ViewChild('ionTabs') ionTabs: Tabs;

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
        this.pages = pages.slice(0, 5);
      }
    }
  }

  openPage(page: Page) {
    let tabs: Tabs = this.navCtrl.parent;
    let index = tabs._tabs.findIndex(tab => tab.root === page.component);
    if (index > -1) {
      tabs.select(index);
    }
  }

}
