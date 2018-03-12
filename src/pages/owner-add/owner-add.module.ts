import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerAddPage } from './owner-add';

@NgModule({
  declarations: [
    OwnerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerAddPage),
  ],
})
export class OwnerAddPageModule {}
