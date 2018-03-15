import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../models/user.dto';
import { StorageService } from '../services/storage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: string = 'HomePage';

  theme: string;

  user: User;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events, public storage: StorageService) {
    this.theme = 'patrimonium-default-theme';
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.startTheme();
      events.subscribe('theme:toggle', () => {
        this.toggleTheme();
      });
    });
  }

  startTheme() {
    this.user = this.storage.getLocalUser().user;
    let localTheme = this.storage.getLocalTheme(this.user);
    if (localTheme != null) {
      this.theme = localTheme;
    }
    this.storage.setLocalTheme(this.user, this.theme);
  }

  toggleTheme() {
    if (this.theme === 'patrimonium-default-theme') {
      this.theme = 'patrimonium-light-theme';
    } else {
      this.theme = 'patrimonium-default-theme';
    }
    this.storage.setLocalTheme(this.user, this.theme);
  }
}
