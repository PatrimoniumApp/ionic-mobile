import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPage } from './info';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    InfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPage),
    ComponentsModule
  ],
  providers: [
    InAppBrowser
  ]
})
export class InfoPageModule {}
