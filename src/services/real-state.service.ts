import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { RealState } from "../models/real-state.dto";

@Injectable()
export class RealStateService {

 constructor(public http: HttpClient) {}

 findAll() : Observable<RealState[]> {
  return this.http.get<RealState[]>(`${API_CONFIG.baseUrl}/realstates`);
 }

 remove(realState: RealState) {
  return this.http.delete(`${API_CONFIG.baseUrl}/realstates/${realState.id}`);
 }

 edit(realState: RealState) {
  return this.http.put(
   `${API_CONFIG.baseUrl}/realstates/${realState.id}`, realState, { observe: 'response', responseType: 'text' }
  );
 }

 insert(realState: RealState) {
  // realState.ownerId = "5ab6c7bf137b000cad021ef1";
  console.log(realState.ownerId);
  return this.http.post(
   `${API_CONFIG.baseUrl}/realstates`, realState, { observe: 'response', responseType: 'text' }
  );
 }

}