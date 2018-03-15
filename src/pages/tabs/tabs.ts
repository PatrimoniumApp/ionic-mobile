import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Page } from '../../models/page.dto';
import { User } from '../../models/user.dto';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  user: User;

  tabs: Page[];

  constructor(public storage: StorageService) {
    this.user = this.storage.getLocalUser().user;
    this.createMenu();
  }

  private createMenu() {
    this.tabs = [];
    this.tabs.push({
      component: 'MainPage',
      title: 'Home',
      icon: null
    });
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
      this.tabs.push({
        title: 'Usuários',
        component: 'UsersPage',
        icon: 'users-small'
      });
    }
  }

  private createUserMenu() {
    if (this.user && this.user.roles.find(role => role === "USER") != null) {
      this.tabs.push(
        {
          title: 'Proprietários',
          component: 'OwnersPage',
          icon: 'owners-small'
        },
        {
          title: 'Bens',
          component: 'AssetsPage',
          icon: 'assets-small'
        },
        {
          title: 'Configurações',
          component: 'SettingsPage',
          icon: 'settings-small'
        },
        {
          title: 'Sobre',
          component: 'InfoPage',
          icon: 'info-small'
        }
      );
    }
  }

  selectTab(page) {
    if (page.component != 'MainPage') {
      this.storage.incrementAccessCounter(this.user, page);
    }
  }
}
