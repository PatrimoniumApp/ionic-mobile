import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage.config";

import { LocalUser } from "../models/local-user.dto";
import { LocalAccess } from "../models/local-access.dto";
import { Page } from "../models/page.dto";
import { User } from "../models/user.dto";

@Injectable()
export class StorageService {

  constructor() {}

  getLocalUser() : LocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user == null) {
      return null;
    }
    return JSON.parse(user);
  }

  setLocalUser(user : LocalUser) {
    if (user == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
  }

  getLocalAccess(user: User) : LocalAccess {
    let localAccess = `accessOf${user.id}`;
    let access = localStorage.getItem(localAccess);
    if (access == null) {
      return null;
    }
    return JSON.parse(access);
  }

  setLocalAccess(user: User, access : LocalAccess) {
    let localAccess = `accessOf${user.id}`;
    if (access == null) {
      localStorage.removeItem(localAccess);
    }
    localStorage.setItem(localAccess, JSON.stringify(access));
  }

  incrementAccessCounter(user: User, page: Page) {
    let localAccess: LocalAccess = this.getLocalAccess(user);
    if (localAccess == null) {
      localAccess = {access: [{page: page, count: 1}]};
      this.setLocalAccess(user, localAccess);
    } else {
      let indexLocalPage = localAccess.access.findIndex(obj => obj.page.component === page.component);
      if (indexLocalPage > -1) {
        let access = localAccess.access[indexLocalPage];
        localAccess.access[indexLocalPage] = {page: page, count: access.count + 1};
        this.setLocalAccess(user, localAccess);
      } else {
        localAccess.access.push({page: page, count: 1});
        this.setLocalAccess(user, localAccess);
      }
    }
  }

  getLocalTheme(user: User) : string {
    let localTheme = `themeOf${user.id}`;
    let theme = localStorage.getItem(localTheme);
    if (theme == null) {
      return null;
    }
    return theme;
  }

  setLocalTheme(user: User, theme : string) {
    let localTheme = `themeOf${user.id}`;
    if (theme == null) {
      localStorage.setItem(localTheme, 'patrimonium-default-theme');
    }
    localStorage.setItem(localTheme, theme);
  }

}