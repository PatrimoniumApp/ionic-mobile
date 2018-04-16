import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersMenuPage } from './users-menu';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UsersMenuPage
  ],
  imports: [
    IonicPageModule.forChild(UsersMenuPage),
    ComponentsModule
  ],
})
export class UsersMenuPageModule {}
