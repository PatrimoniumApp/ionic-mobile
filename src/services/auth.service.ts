import { API_CONFIG } from "../config/api.config";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


import { JwtHelper } from 'angular2-jwt';

import { StorageService } from "./storage.service";

import { LocalUser } from "../models/local-user.dto";
import { Credentials } from "../models/credentials.dto";
import { Events } from "ionic-angular";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, public storage: StorageService, public userService: UserService, public events: Events) { }

  isLogged(): boolean {
    let localUser = this.storage.getLocalUser();
    return localUser != null;
  }

  authenticate(credentials: Credentials) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`, credentials, { observe: 'response', responseType: 'text' }
    );
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh`, {}, { observe: 'response', responseType: 'text' }
    );
  }

  login(authorization: string) {
    let token = authorization.substring(7);
    let username = this.jwtHelper.decodeToken(token).sub;

    let localUser: LocalUser = {
      token: token,
      user: null
    };
    this.storage.setLocalUser(localUser);

    this.userService.findByUsername(username)
      .subscribe(response => {
        let localUser: LocalUser = {
          token: token,
          user: response
        };
        this.storage.setLocalUser(localUser);
        this.events.publish('auth');
      },
      error => {}
    );
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
