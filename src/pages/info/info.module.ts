import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPage } from './info';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    InfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPage),
  ],
  providers: [
    InAppBrowser
  ]
})
export class InfoPageModule {}
