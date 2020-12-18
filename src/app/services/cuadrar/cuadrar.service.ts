import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
    ENDPOINT_CUADRAR_GETINFO, 
    ENDPOINT_CREATE_CUADRAR_GETINFO
} from "../../../config/app-config";

@Injectable({
  providedIn: "root",
})
export class CuadrarService {
  constructor(private http: HttpClient) {}

  getSquare(): Observable<any> {
    return this.http.post(ENDPOINT_CUADRAR_GETINFO, JSON.stringify({screen:"cuadre caja"}));
  }

  
  createSquare(obj:any): Observable<any> {
    return this.http.post(ENDPOINT_CREATE_CUADRAR_GETINFO, JSON.stringify(obj));
  }

}

