import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { CuadrarService } from "../../services/cuadrar/cuadrar.service";

@Component({
  selector: "app-cuadre",
  templateUrl: "./cuadre.page.html",
  styleUrls: ["./cuadre.page.scss"],
})
export class CuadrePage implements OnInit {
  loanding = true;
  montoPendiente: number;
  montoPerdida: number;
  ventaLoteria: number;
  totalEntrega: number;
  constructor(
    private alertController: AlertController,
    private cuadrarService: CuadrarService
  ) {
    this.montoPendiente = 0;
    this.montoPerdida = 0;
    this.ventaLoteria = 0;
    this.totalEntrega = 0;
  }

  ngOnInit() {
    this.getCuadre();
  }

  async onRefresh() {
    this.getCuadre();
  }

  async onCuadrar() {
    this.loanding=true;
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "info para el cuadre!",
      subHeader:`Monto a entregar: ${this.totalEntrega}`,
      inputs: [
        {
          name: "userAdmin",
          type: "text",
          placeholder: "Usuario",
        },
        {
          name: "passAdmin",
          type: "password",
          placeholder: "Password",
        },
        {
          name: "montoEntregado",
          type: "number",
          placeholder: "Monto a entregar",
        } 
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
            this.loanding=false;
          },
        },
        {
          text: "OK",
          handler: async (values) => {
            if(!values 
              || !values.userAdmin 
              || !values.passAdmin 
              || !values.montoEntregado){
                await this.presentAlert("Debe de completar los datos para el cuadre.");
                this.loanding=false;
                return;
            }
            if(parseInt(values.montoEntregado)===0){
              await this.presentAlert("No hay montos disponible para efectuar un cuadre.");
              this.loanding = false;
              return;
            }
            if(parseInt(values.montoEntregado)!==this.totalEntrega){
              if(parseInt(values.montoEntregado)>this.totalEntrega){
                await this.presentAlert("El monto a entregar no puede ser mayor a esperado.");
                this.loanding = false;
                return;
              }
              await this.presentAlertConfirmation(values);
              return;
            }else{
              await this.crearCuadre(values.userAdmin,values.passAdmin ,values.montoEntregado);
            }
           
          },
        },
      ],
    });

    await alert.present();
  }

  async crearCuadre(userAdmin,passAdmin,montoEntregado){
    console.log("Creando cuadre...");
    const obj ={
      amountSquare:montoEntregado,
      userAdminName: userAdmin,
      userAdminPass: passAdmin
    };
    this.cuadrarService.createSquare(obj).subscribe(
      async (response) => {
        console.log("Resultado de la creacion del cuadre", response);
        if (response && response.status === "OK") {
          await this.presentOk('cuadre creado correctamente.');
        } else {
          await this.presentAlert(
            `No se pudo encontrar la informacion del cuadre, porque: ${response.message}`
          );
        }
        await this.getCuadre();
      },
      async () => {
        await this.presentAlert(
          "Ha ocurrido un problema con la aplicación, favor intentarlo mas tarde."
        );
        this.loanding = false;
      }
    );
  }

  async getCuadre() {
    console.log("Buscando informacion del cuadre...");
    this.cuadrarService.getSquare().subscribe(
      async (response) => {
        console.log("Resultado de la informacion del cuadre", response);
        if (response && response.status === "OK") {
          this.montoPendiente = response.data.pendingAmount;
          this.montoPerdida = response.data.loseAmount;
          this.ventaLoteria = response.data.loterySalesAmount;
          this.totalEntrega =
            (response.data.loterySalesAmount - response.data.loseAmount) + response.data.pendingAmount;
        } else {
          await this.presentAlert(
            `No se pudo encontrar la informacion del cuadre, porque: ${response.message}`
          );
        }
        this.loanding = false;
      },
      async () => {
        await this.presentAlert(
          "Ha ocurrido un problema con la aplicación, favor intentarlo mas tarde."
        );
        this.loanding = false;
      }
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

  async presentAlertConfirmation(values) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Dinero a entregar es diferente.',
      message: 'El dinero a entregar es diferente, esta seguro de realizar el cuadre?',
      buttons:  [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            
            this.loanding=false;
            return;
          },
        },
        {
          text: "Aceptar",
          handler: async () => { 
            await this.crearCuadre(values.userAdmin,values.passAdmin ,values.montoEntregado);
            return;
          },
        },
      ],
    });

    await alert.present();
  }
}
