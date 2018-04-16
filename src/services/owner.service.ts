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

 remove(owner: Owner) {
  return this.http.delete(`${API_CONFIG.baseUrl}/owners/${owner.id}`);
 }

 edit(owner: Owner) {
  return this.http.put(
   `${API_CONFIG.baseUrl}/owners/${owner.id}`, owner, { observe: 'response', responseType: 'text' }
  );
 }

 insert(owner: Owner) {
  return this.http.post(
   `${API_CONFIG.baseUrl}/owners`, owner, { observe: 'response', responseType: 'text' }
  );
 }

}