import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealStatesMenuPage } from './real-states-menu';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RealStatesMenuPage
  ],
  imports: [
    IonicPageModule.forChild(RealStatesMenuPage),
    ComponentsModule
  ],
})
export class RealStatesMenuPageModule {}
