import { Component, Input, ViewChild } from '@angular/core';
import { NavController, AlertController, Slides, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.dto';
import { Page } from '../../models/page.dto';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'menu-header',
  templateUrl: 'menu-header.html'
})
export class MenuHeaderComponent {

  @Input() title: string;

  @ViewChild(Slides) slides: Slides;

  user: User;

  tabs: Page[];

  public selectedPage: Page;

  indexes = [];

  slidesPerView: number = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public alertCtrl: AlertController, public storage: StorageService) {
    this.user = this.storage.getLocalUser().user;
  }

  ngAfterViewInit() {
    this.createMenu();
    this.slides.freeMode = true;
  }

  askLogout() {
    this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.logout();
          }
        }
      ]
    }).present();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot('HomePage');
  }

  filterData(page: Page): void {
    this.selectedPage = page;
    if (page.component != 'MainPage') {
      this.storage.incrementAccessCounter(this.user, page);
    }
    this.navCtrl.setRoot(page.component, {page: page});
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
    this.createIndexes();
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
          component: 'RealStatesPage',
          icon: 'real-states-small'
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
      let startIndex = 0;
      if (this.indexes.find(obj => obj.component === 'UsersPage') != null) {
        startIndex = 1;
      }
    }
  }

  createIndexes() {
    setTimeout(() => {
      let factor = Math.ceil(this.tabs.length / this.slidesPerView);
      for(let i=0; i<this.tabs.length; i++) {
        this.indexes.push({component: this.tabs[i].component, index: Math.floor(i / factor)});
      }
    }, 250);
    let page = this.navParams.get('page');
    if (page == null) {
      this.selectedPage = this.tabs[0];
    } else {
      this.selectedPage = this.tabs.find(obj => obj.component === page.component);
      setTimeout(() => {
        let index = this.indexes.find(obj => obj.component === page.component).index;
        if (this.selectedPage.component !== 'MainPage') {
          index++;
        }
        this.slides.slideTo(index);
      }, 250);
    }
  }

}
