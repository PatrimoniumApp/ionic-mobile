import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealStatesPage } from './real-states';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RealStatesPage,
  ],
  imports: [
    IonicPageModule.forChild(RealStatesPage),
    ComponentsModule
  ],
})
export class RealStatesPageModule {}
