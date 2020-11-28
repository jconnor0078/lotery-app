import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { JugadasService } from "../../services/jugadas/jugadas.service";

@Component({
  selector: "app-anular-ticket",
  templateUrl: "./anular-ticket.page.html",
  styleUrls: ["./anular-ticket.page.scss"],
})
export class AnularTicketPage implements OnInit {
  loanding = false;
  noTicket: number;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private jugadasService: JugadasService
  ) {}

  ngOnInit() {}

  async onAnular() {
    if (this.noTicket > 0) {
      this.loanding = true;
      console.log("Anulando ticket...");
      this.jugadasService.anularTicketPorCodigo(this.noTicket).subscribe(
        async (response) => {
          console.log("Resultado de la anulacion del ticket", response);
          if (response && response.status === "OK" && response.data) {
            await this.presentOk("Ticket Anulado!");
          } else {
            await this.presentAlert(
              `No se pudo anular el ticket ${this.noTicket} por: ${response.message}`
            );
          }
          this.loanding = false;
        },
        async () => {
          await this.presentAlert("Ha ocurrido un problema con la aplicación, favor intentarlo mas tarde.");
          this.loanding= false;
        }
      ) 
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
