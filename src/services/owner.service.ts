import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Owner } from "../models/owner.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class OwnerService {

 constructor(public http: HttpClient) {}

 findAll() : Observable<Owner[]> {
  return this.http.get<Owner[]>(`${API_CONFIG.baseUrl}/owners`);
 }

 remove(user: Owner) {
  return this.http.delete(`${API_CONFIG.baseUrl}/owners/${user.id}`);
 }

 edit(user: Owner) {
  return this.http.put(
   `${API_CONFIG.baseUrl}/owners/${user.id}`, user, { observe: 'response', responseType: 'text' }
  );
 }

 insert(user: Owner) {
  return this.http.post(
   `${API_CONFIG.baseUrl}/owners`, user, { observe: 'response', responseType: 'text' }
  );
 }

}