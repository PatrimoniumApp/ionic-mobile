import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealStateAddPage } from './real-state-add';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RealStateAddPage,
  ],
  imports: [
    IonicPageModule.forChild(RealStateAddPage),
    ComponentsModule
  ],
})
export class RealStateAddPageModule {}
