import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class UserService {

 constructor(public http: HttpClient) {}

 findByUsername(username: string) : Observable<User> {
  return this.http.get<User>(`${API_CONFIG.baseUrl}/users/username?value=${username}`);
 }

 findAll() : Observable<User[]> {
  return this.http.get<User[]>(`${API_CONFIG.baseUrl}/users`);
 }

 remove(user: User) {
  return this.http.delete(`${API_CONFIG.baseUrl}/users/${user.id}`);
 }

 edit(user: User) {
  return this.http.put(
   `${API_CONFIG.baseUrl}/users/${user.id}`, user, { observe: 'response', responseType: 'text' }
  );
 }

 insert(user: User) {
  return this.http.post(
   `${API_CONFIG.baseUrl}/users`, user, { observe: 'response', responseType: 'text' }
  );
 }

}