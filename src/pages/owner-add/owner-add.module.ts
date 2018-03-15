import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerAddPage } from './owner-add';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OwnerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerAddPage),
    ComponentsModule
  ],
})
export class OwnerAddPageModule {}
