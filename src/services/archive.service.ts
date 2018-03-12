import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { Archive } from "../models/archive.dto";

@Injectable()
export class ArchiveService {

 constructor(public http: HttpClient) {}

 findById(id: string) : Observable<Archive> {
  return this.http.get<Archive>(`${API_CONFIG.baseUrl}/archives/${id}`);
 }

}