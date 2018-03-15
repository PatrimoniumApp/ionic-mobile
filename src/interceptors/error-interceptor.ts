import { Injectable, ViewChild } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Nav } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  @ViewChild(Nav) nav: Nav;

  constructor(public storage: StorageService, public alertCtrl: AlertController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('/wake') > -1) {
      return next.handle(request);
    }
    return next.handle(request)
      .catch((error, caught) => {

        let errorObj = error;

        if (error.statusText && error.statusText === 'Unknown Error') {
          errorObj = {
            timestamp: null,
            status: 0,
            error: 'Erro',
            message: 'Verifique sua conexão com a internet.<br/><br/>Se você estiver conectado, o servidor do sistema Patrimonium pode estar offline',
            path: ''
          };
        } else {
          if (errorObj.error) {
            errorObj = errorObj.error;
          }

          if (!errorObj.status) {
            errorObj = JSON.parse(errorObj);
          }
        }

        switch (errorObj.status) {
          case 401: {
            this.handle401();
            break;
          }
          case 403: {
            this.handle403();
            break;
          }
          default: {
            this.handleDefaultEror(errorObj);
          }
        }

        return Observable.throw(errorObj);
      }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
    console.log(this.storage.getLocalUser());
    this.nav.setRoot('HomePage');
  }

  handle401() {
    this.alertCtrl.create({
      title: 'Falha de autenticação',
      message: 'Verifique suas credenciais',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    }).present();
  }

  handleDefaultEror(errorObj) {
    this.alertCtrl.create({
      title: errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    }).present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};