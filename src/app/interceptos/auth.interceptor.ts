import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { AlertController } from "@ionic/angular";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private alertController: AlertController) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmI3ZWRkOWY1OGRkMTU4ODhhZWMxNDciLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2MDU4ODk1NTAsImV4cCI6MTYzNjk5MzU1MH0.k_iSzCAf5JI3e9SvuJ1NWjqzG9NiQ-OjOf6W8uITOvc";

    //Authentication by setting header with token value

    if (token) {
      request = request.clone({
        setHeaders: {
          token: token,
        },
      });
    }
    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        setHeaders: {
          "content-type": "application/json",
        },
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("event--->>>", event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error en el interceptor: ", error);
        if (error.status === 403) {
          this.presentAlert("Acceso denegado.");
          return;
        }
        if (error.error && error.error.message) {   
          this.presentAlert("Ha ocurrido un error: "+ error.error.message);
          return;
        }
        if(error.error && error.error.indexOf("Not allowed by CORS") > -1){
            this.presentAlert("Ha ocurrido un error: Dispositivo no permitido");
            return;
        }
        this.presentAlert("Ha ocurrido un error desconocido");
        return throwError(error);
      })
    );
  }

  async presentAlert(err) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Alerta",
      subHeader: "Ha ocurrido un problema",
      message: err,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
