import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { JugadasService } from "../../services/jugadas/jugadas.service";

@Component({
  selector: "app-copiar-ticket",
  templateUrl: "./copiar-ticket.page.html",
  styleUrls: ["./copiar-ticket.page.scss"],
})
export class CopiarTicketPage implements OnInit {
  buscando = false;
  noTicket: number;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private jugadasService: JugadasService
  ) {}

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({});
  }

  async onBuscar() {
    if (this.noTicket > 0) {
      this.buscando = true;
      console.log("Buscando ticket...");
      this.jugadasService
        .buscarTicketPorCodigo(this.noTicket)
        .subscribe(async (response) => {
          console.log("Resultado de la busqueda del ticket", response);
          if (
            response &&
            response.status === "OK" &&
            response.data &&
            response.data !== null
          ) {
            await this.presentOk("Ticket Copiado!");
            this.modalController.dismiss(response.data);
          } else {
            await this.presentAlert(
              `No se encontro ningun ticket con el codigo ${this.noTicket}`
            );
          }
          this.buscando = false;
        });
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
