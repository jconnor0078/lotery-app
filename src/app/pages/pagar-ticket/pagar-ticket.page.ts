import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { JugadasService } from "../../services/jugadas/jugadas.service";

@Component({
  selector: "app-pagar-ticket",
  templateUrl: "./pagar-ticket.page.html",
  styleUrls: ["./pagar-ticket.page.scss"],
})
export class PagarTicketPage implements OnInit {
  loanding = false;
  noTicket: number;
  montoPagar: string;
  constructor(
    private alertController: AlertController,
    private jugadasService: JugadasService
  ) {
    this.montoPagar = "RD$ 0";
  }

  ngOnInit() {}

  async onPagar() {
    if (this.noTicket > 0) {
      this.loanding = true;
      console.log("Pagando ticket...");
      this.jugadasService.pagarTicket(this.noTicket).subscribe(
        async (response) => {
          console.log("Resultado del pago del ticket", response);
          if (response && response.status === "OK") {
            await this.presentOk(response.data.htmlStr);
            this.montoPagar = "RD$ 0";
          } else {
            await this.presentAlert(
              `Ha ocurrido un problema tratando de pagar el ticket no. ${this.noTicket}: ${response.message}`
            );
            this.montoPagar = "RD$ 0";
          }
          this.loanding = false;
        },
        async () => {
          await this.presentAlert(
            "Ha ocurrido un problema con la aplicación, favor intentarlo mas tarde."
          );
          this.montoPagar = "RD$ 0";
          this.loanding = false;
        }
      );
    }
  }

  async onConsulta() {
    if (this.noTicket > 0) {
      this.loanding = true;
      console.log("Consultando ticket...");
      this.jugadasService.consultarTicket(this.noTicket).subscribe(
        async (response) => {
          console.log("Resultado de la consulta del ticket", response);
          if (
            response &&
            response.status === "OK" &&
            response.data &&
            response.data.amount &&
            response.data.amount > 0
          ) {
            await this.presentOk("Felicidades, ticket ganador!");
            this.montoPagar = `RD$ ${response.data.amount}`;
          } else {
            await this.presentAlert(
              `Resultado de la consulta del ticket no. ${this.noTicket}: ${response.message}`
            );
            this.montoPagar = "RD$ 0";
          }
          this.loanding = false;
        },
        async () => {
          await this.presentAlert(
            "Ha ocurrido un problema con la aplicación, favor intentarlo mas tarde."
          );
          this.montoPagar = "RD$ 0";
          this.loanding = false;
        }
      );
    }
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

  async presentOk(txt) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Alerta",
      subHeader: "Acción realizada con éxito",
      message: txt,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
