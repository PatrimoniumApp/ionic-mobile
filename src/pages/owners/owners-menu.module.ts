import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnersMenuPage } from './owners-menu';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OwnersMenuPage
  ],
  imports: [
    IonicPageModule.forChild(OwnersMenuPage),
    ComponentsModule
  ],
})
export class OwnersMenuPageModule {}
