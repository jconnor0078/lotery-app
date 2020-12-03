import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  ENDPOINT_CREATE_TICKET,
  ENDPOINT_GET_TICKET_BY_CODE,
  ENDPOINT_CANCEL_TICKET_BY_CODE,
  ENDPOINT_CONSULT_TICKET,
  ENDPOINT_PAY_TICKET
} from "../../../config/app-config";

@Injectable({
  providedIn: "root",
})
export class JugadasService {
  constructor(private http: HttpClient) {}

  createTicket(ticket: any): Observable<any> {
    return this.http.post(ENDPOINT_CREATE_TICKET, JSON.stringify(ticket));
  }

  buscarTicketPorCodigo(noTicket: number): Observable<any> {
    return this.http.get(
      ENDPOINT_GET_TICKET_BY_CODE.concat(noTicket.toString())
    );
  }

  anularTicketPorCodigo(noTicket: number): Observable<any> {
    return this.http.post(
      ENDPOINT_CANCEL_TICKET_BY_CODE,
      JSON.stringify({ ticketCode: noTicket })
    );
  }

  consultarTicket(noTicket: number): Observable<any> {
    return this.http.post(
      ENDPOINT_CONSULT_TICKET,
      JSON.stringify({ ticketCode: noTicket })
    );
  }

  pagarTicket(noTicket: number): Observable<any> {
    return this.http.post(
      ENDPOINT_PAY_TICKET,
      JSON.stringify({ ticketCode: noTicket })
    );
  }
}
