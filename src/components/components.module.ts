import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LogoutHeaderComponent } from './logout-header/logout-header';

@NgModule({
	declarations: [LogoutHeaderComponent],
	imports: [IonicModule],
	exports: [LogoutHeaderComponent]
})
export class ComponentsModule {}
