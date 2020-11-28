import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENDPOINT_REPORT_SALES_SUMMARY } from "../../../config/app-config";

@Injectable({
  providedIn: "root",
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  getReportSalesSummary(obj: any): Observable<any> {
    return this.http.post(ENDPOINT_REPORT_SALES_SUMMARY, JSON.stringify(obj));
  }
}
