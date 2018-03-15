import { Component } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { User } from '../../models/user.dto';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  theme: string;

  user: User;

  constructor(public events: Events, public storage: StorageService) {
    this.user = this.storage.getLocalUser().user;
    let actualTheme = this.storage.getLocalTheme(this.user);
    this.theme = this.title(actualTheme);
  }

  title(actualTheme: string) {
    if (actualTheme === 'patrimonium-default-theme') {
      return 'Light';
    } else {
      return 'Dark';
    }
  }

  toggle() {
    this.events.publish('theme:toggle');
    let actualTheme = this.storage.getLocalTheme(this.user);
    this.theme = this.title(actualTheme);
  }

}
