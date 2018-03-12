import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerDetailPage } from './owner-detail';

@NgModule({
  declarations: [
    OwnerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerDetailPage),
  ],
})
export class OwnerDetailPageModule {}
