import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnersPage } from './owners';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OwnersPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnersPage),
    ComponentsModule
  ],
})
export class OwnerPageModule {}
