import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENDPOINT_GET_SCREEN_DATA_SERVICE } from "../../../config/app-config";

@Injectable({
  providedIn: "root",
})
export class PantallasService {
  constructor(private http: HttpClient) {}

  getScreenData(screenId: string): Observable<any> {
    return this.http.get(ENDPOINT_GET_SCREEN_DATA_SERVICE.concat(screenId));
  }
}
