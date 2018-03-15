import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAddPage } from './user-add';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserAddPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAddPage),
    ComponentsModule
  ],
})
export class UserAddPageModule {}
