import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

import { Wake } from "../models/wake.dto";

import { Observable } from "rxjs/Rx";

@Injectable()
export class WakeService {

 constructor(public http: HttpClient) {}

 awake() : Observable<Wake> {
  return this.http.get<Wake>(`${API_CONFIG.baseUrl}/wake`);
 }

}