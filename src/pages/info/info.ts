import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(public browser: InAppBrowser) {}

  openWebPage(url: string) {
    this.browser.create(url, '_self', {location: 'no'});
  }

}
