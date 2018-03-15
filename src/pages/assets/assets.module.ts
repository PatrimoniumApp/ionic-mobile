import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetsPage } from './assets';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AssetsPage,
  ],
  imports: [
    IonicPageModule.forChild(AssetsPage),
    ComponentsModule
  ],
})
export class AssetsPageModule {}
