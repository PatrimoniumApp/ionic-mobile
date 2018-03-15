import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerDetailPage } from './owner-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OwnerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerDetailPage),
    ComponentsModule
  ],
})
export class OwnerDetailPageModule {}
