import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../models/user.dto';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { WakeService } from '../services/wake.service';
import { Page } from '../models/page.dto';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  menu: Page[];

  user: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public events: Events,
    public authService: AuthService,
    public storage: StorageService,
    public wakeService: WakeService
  ) {
    this.initializeApp();
  }

  private prepare() {
    if (this.authService.isLogged()) {
      this.user = this.storage.getLocalUser().user;
      this.createMenu();
    }
  }

  private createMenu() {
    this.menu = [];
    this.createSuperMenu();
    this.createAdminMenu();
    this.createUserMenu();
  }

  private createSuperMenu() {
    if (this.user && this.user.roles.find(role => role === "SUPER") != null) {
    }
  }

  private createAdminMenu() {
    if (this.user && this.user.roles.find(role => role === "ADMIN") != null) {
      this.menu.push({
        title: 'Usuários',
        component: 'UserPage',
        icon: 'users'
      });
    }
  }

  private createUserMenu() {
    if (this.user && this.user.roles.find(role => role === "USER") != null) {
      this.menu.push(
        {
          title: 'Proprietários',
          component: 'OwnerPage',
          icon: 'owners'
        },
        {
          title: 'Bens',
          component: 'AssetsPage',
          icon: 'home'
        },
        {
          title: 'Sobre',
          component: 'InfoPage',
          icon: 'patrimonium'
        }
      );
    }
  }

  private awake() {
    this.wakeService.awake()
    .subscribe(
      response => {
        this.prepare();
        this.events.subscribe('auth', () => {this.prepare();});
      },
      error => {}
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.awake();
      }
    );
  }

  logout() {
    this.authService.logout();
    this.nav.setRoot('HomePage');
  }

  openPage(page: Page) {
    this.storage.incrementAccessCounter(this.user, page);
    this.nav.push(page.component);
  }
}
