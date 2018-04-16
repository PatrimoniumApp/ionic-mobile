import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OwnerService } from '../services/owner.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { ComponentsModule } from '../components/components.module';
import { RealStateService } from '../services/real-state.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RealStateService,
    AuthService,
    OwnerService,
    StorageService,
    UserService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class AppModule {}
