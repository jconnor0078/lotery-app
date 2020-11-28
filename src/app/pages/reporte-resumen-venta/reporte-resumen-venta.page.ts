import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { ReportesService } from "../../services/reportes/reportes.service";
@Component({
  selector: "app-reporte-resumen-venta",
  templateUrl: "./reporte-resumen-venta.page.html",
  styleUrls: ["./reporte-resumen-venta.page.scss"],
})
export class ReporteResumenVentaPage implements OnInit {
  loanding = false;
  from: Date;
  to: Date;
  isAward: Boolean = true;
  isFinalSummary: Boolean = true;
  isWinnerTicket: Boolean = false;
  isNullTicket: Boolean = false;
  isPaidTicket: Boolean = false;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private reporteService: ReportesService
  ) {}

  ngOnInit() {}

  async onVisualizar() {
    if (
      !this.isAward &&
      !this.isFinalSummary &&
      !this.isWinnerTicket &&
      !this.isNullTicket &&
      !this.isPaidTicket
    ) {
      await this.presentAlert(
        "Debe de seleccionar por lo menos una opción para generar el reporte."
      );
      return;
    }
    if (!this.from || !this.to) {
      await this.presentAlert("Coloque un rango de fecha válido.");
      return;
    }
    this.loanding = true;
    const dateFrom = new Date(this.from);
    const dateTo = new Date(this.to);
    const fromDateFormated = `${dateFrom.getFullYear()}-${
      dateFrom.getMonth() + 1
    }-${dateFrom.getDate()}`;
    const toDateFormated = `${dateTo.getFullYear()}-${
      dateTo.getMonth() + 1
    }-${dateTo.getDate()}`;
    const objToReport = {
      from: fromDateFormated,
      to: toDateFormated,
      isAward: this.isAward,
      isFinalSummary: this.isFinalSummary,
      isWinnerTicket: this.isWinnerTicket,
      isNullTicket: this.isNullTicket,
      isPaidTicket: this.isPaidTicket,
    };
    console.log("Buscando info del reporte de resumen de ventas...");
    this.reporteService
      .getReportSalesSummary(objToReport)
      .subscribe(async (response) => {
        console.log("Resultado del reporte de resumen de ventas", response);
        this.loanding = false;
        await this.presentAlert(response.data.htmlStr);
      },
      async () => {
        await this.presentAlert("Ha ocurrido un problema con la aplicación, favor intentarlo mas tarde.");
        this.loanding= false;
      });
  }

  on_change(campo) {
    switch (campo) {
      case "isAward":
        this.isAward = !this.isAward;
        break;
      case "isFinalSummary":
        this.isFinalSummary = !this.isFinalSummary;
        break;
      case "isWinnerTicket":
        this.isWinnerTicket = !this.isWinnerTicket;
        break;
      case "isNullTicket":
        this.isNullTicket = !this.isNullTicket;
        break;
      case "isPaidTicket":
        this.isPaidTicket = !this.isPaidTicket;
        break;
      default:
        break;
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
