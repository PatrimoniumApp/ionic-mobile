import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ArchiveService } from '../services/archive.service';
import { AuthService } from '../services/auth.service';
import { FileService } from '../services/file.service';
import { OwnerService } from '../services/owner.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { WakeService } from '../services/wake.service';

import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    ArchiveService,
    AuthService,
    FileService,
    OwnerService,
    StorageService,
    UserService,
    WakeService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class AppModule {}
