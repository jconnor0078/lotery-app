import {
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JugadasPage } from "../jugadas/jugadas.page";
import { LoteriasDisponiblesPage } from "../loterias-disponibles/loterias-disponibles.page";
import { LoteriasDispParaSuperPalePage } from "../loterias-disp-para-super-pale/loterias-disp-para-super-pale.page";
import {CopiarTicketPage} from '../copiar-ticket/copiar-ticket.page';
import { PantallasService } from "../../services/pantallas/pantallas.service";
import { JugadasService } from "../../services/jugadas/jugadas.service";

@Component({
  selector: "app-ventas",
  templateUrl: "./ventas.page.html",
  styleUrls: ["./ventas.page.scss"],
})
export class VentasPage implements OnInit {
  screenId = "1";
  title: string;
  itemSelected = "fieldN";
  valueN = "";
  valueM = "";
  totalM = 0;
  jugadas = [];
  loanding = true;
  loteriasDisponibles = [];
  loteriasDisponiblesParaSuperPale = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pantallasService: PantallasService,
    private jugadasService: JugadasService,
    public modalController: ModalController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.paramMap.get("id");
    this.loanding = false;
    console.log("Buscando info de pantalla 1");
    this.pantallasService.getScreenData(this.screenId).subscribe((response) => {
      console.log("Resultado de info de pantalla 1", response);
      if (response && response.status === "OK") {
        if (response.data.loteries && response.data.loteries.length > 0) {
          response.data.loteries.forEach((element) => {
            this.loteriasDisponibles.push({_id: element._id, name: element.name, selected: false});
            this.loteriasDisponiblesParaSuperPale.push({_id: element._id, name: element.name, selected: false});
          });
        }
        //this.loteriasDisponibles = loteriasAux;
        //this.loteriasDisponiblesParaSuperPale = loteriasAux;
      }
    });
  }

  async presentModal() {
    this.loanding = true;
    const modal = await this.modalController.create({
      component: JugadasPage,
      componentProps: { jugadas: this.jugadas },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.totalM = this.getTotalM(); // data.montoTotal;
    this.loanding = false;
  }
  selectElement(element) {
    if (element === "N") {
      this.itemSelected = "fieldN";
    } else {
      this.itemSelected = "fieldM";
    }
  }
  presKey(n) {
    if (this.itemSelected == "fieldN") {
      if (n > -1) {
        if (this.valueN.length < 6) {
          this.valueN = this.valueN + n.toString();
        }
      } else {
        let len = this.valueN.length;
        if (len > 0) {
          this.valueN = this.valueN.substring(0, len - 1);
        }
      }
    } else {
      if (n > -1) {
        this.valueM = this.valueM + n.toString();
      } else {
        let len = this.valueM.length;
        if (len > 0) {
          this.valueM = this.valueM.substring(0, len - 1);
        }
      }
    }
  }

  async pressE() {
    if (this.itemSelected === "fieldN") {
      this.itemSelected = "fieldM";
    } else {
      //realizar guardado
      let error = this.valError();
      if (error.trim().length > 0) {
        await this.presentAlert(error);
        return;
      }
      let obj = {
        tipo: this.getType(this.getRealN().trim()),
        num: this.getRealN().trim(),
        monto: this.valueM.trim(),
      };
      this.addJugada(obj, true);
      this.resetAll();
    }
  }

  addJugada(obj, addAnywhere) {
    let i = this.ExistJugada(obj);
    if (i === -1) {
      this.jugadas.push(obj);
    } else {
      if (addAnywhere === true) {
        this.jugadas[i].monto =
          parseInt(this.jugadas[i].monto) + parseInt(obj.monto);
      }
    }
  }

  private resetAll() {
    this.valueM = "";
    this.valueN = "";
    this.totalM = this.getTotalM();
    this.itemSelected = "fieldN";
    this.jugadas = this.jugadasSorted();
  }

  ExistJugada(obj) {
    let res = -1;
    let tip = obj.tipo;
    if (this.jugadas !== null && this.jugadas.length > 0) {
      for (let index = 0; index < this.jugadas.length; index++) {
        //quiniela
        switch (tip) {
          case "Qui": //quiniela
            if (this.jugadas[index].tipo === "Qui") {
              if (
                this.valJugadasSiSonIgualesQui(obj.num, this.jugadas[index].num)
              ) {
                res = index;
              }
            }
            break;
          case "Pale": //pale
            if (this.jugadas[index].tipo === "Pale") {
              if (
                this.valJugadasSiSonIgualesPale(
                  obj.num,
                  this.jugadas[index].num
                )
              ) {
                res = index;
              }
            }
            break;
          case "Trip": //tripleta
            if (this.jugadas[index].tipo === "Trip") {
              if (
                this.valJugadasSiSonIgualesTrip(
                  obj.num,
                  this.jugadas[index].num
                )
              ) {
                res = index;
              }
            }
            break;
          case "SuperP": //SuperPale
            break;
          default:
            break;
        }
      }
      return res;
    } else {
      return res;
    }
  }

  private valJugadasSiSonIgualesQui(n1, n2) {
    let res = false;
    if (n1.trim() === n2.trim()) {
      res = true;
    }
    return res;
  }
  private valJugadasSiSonIgualesPale(p1, p2) {
    let a1 = p1[0].trim() + p1[1].trim();
    let a2 = p1[2].trim() + p1[3].trim();
    let b1 = p2[0].trim() + p2[1].trim();
    let b2 = p2[2].trim() + p2[3].trim();
    if ((a1 === b1 && a2 === b2) || (a1 === b2 && a2 === b1)) {
      return true;
    } else {
      return false;
    }
  }
  private valJugadasSiSonIgualesTrip(n1, n2) {
    let res = false;
    let array1 = [
      n1[0].trim() + n1[1].trim(),
      n1[2].trim() + n1[3].trim(),
      n1[4].trim() + n1[5].trim(),
    ];
    let array2 = [
      n2[0].trim() + n2[1].trim(),
      n2[2].trim() + n2[3].trim(),
      n2[4].trim() + n2[5].trim(),
    ];
    array1.sort();
    array2.sort();
    res = array1.every(function (v, i) {
      return v === array2[i];
    });
    return res;
  }

  private valError() {
    // valueN="";
    // valueM="";
    let error = "";
    if (this.valueN === undefined || this.valueN.trim().length < 1) {
      error = "Debe ingresar el numero de la jugada.";
    } else if (this.valueM === undefined || this.valueM.trim().length < 1) {
      error = "Debe ingresar el monto de la jugada.";
    }
    return error;
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

  private getRealN() {
    let len = this.valueN.length;
    if (len === 1 || len === 3 || len === 5) {
      if (len === 1) {
        return "0" + this.valueN;
      }
      if (len === 3) {
        return this.valueN.substring(0, 2) + "0" + this.valueN.substring(2, 3);
      }
      if (len === 5) {
        return (
          this.valueN.substr(0, 2) +
          this.valueN.substr(2, 2) +
          "0" +
          this.valueN.substr(4, 5)
        );
      }
    } else {
      return this.valueN;
    }
  }
  private getType(value) {
    let len = value.trim().length;
    if (len === 2) {
      return "Qui";
    }
    if (len === 4) {
      return "Pale";
    }
    if (len === 6) {
      return "Trip";
    }
  }

  private getTotalM() {
    if (this.jugadas != null && this.jugadas.length > 0) {
      let lenLotSelected = this.getLoteriasSeleccionadas().length;
      let loteriasSuperPale = this.getLoteriasSeleccionadasSuperPale().length;
      if (lenLotSelected === 0) {
        lenLotSelected = 1;
      }
      let sumTotal = 0;
      this.jugadas.forEach((val) => {
        if (val.tipo === "Pale" && loteriasSuperPale > 0) {
          sumTotal = sumTotal + parseInt(val.monto);
        } else {
          sumTotal = sumTotal + parseInt(val.monto) * lenLotSelected;
        }
      });
      return sumTotal;
    } else {
      return 0;
    }
  }

  private jugadasSorted() {
    return this.jugadas.sort((a, b) => {
      let fa = a.tipo.toLowerCase(),
        fb = b.tipo.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  generatePale(quinielasEnjugadas) {
    let pales = [];
    if (quinielasEnjugadas !== null && quinielasEnjugadas.length > 1) {
      for (let i = 0; i < quinielasEnjugadas.length; i++) {
        for (let j = i; j < quinielasEnjugadas.length; j++) {
          if (j >= i) {
            let pnn =
              quinielasEnjugadas[i].num.trim() +
              quinielasEnjugadas[j].num.trim();
            let pni =
              quinielasEnjugadas[i].num.trim() +
              this.invertirNum(quinielasEnjugadas[j].num.trim()).trim();
            let pii =
              this.invertirNum(quinielasEnjugadas[i].num.trim()).trim() +
              this.invertirNum(quinielasEnjugadas[j].num.trim()).trim();
            pales.push(pnn);
            pales.push(pni);
            pales.push(pii);
          }
        }
      }
    }
    return pales;
  }

  generateTripleta(quinielasEnjugadas) {
    let tripletas = [];
    if (quinielasEnjugadas !== null && quinielasEnjugadas.length > 2) {
      for (let i = 0; i < quinielasEnjugadas.length; i++) {
        for (let j = i; j < quinielasEnjugadas.length; j++) {
          if (j >= i) {
            for (let k = i; k < quinielasEnjugadas.length; k++) {
              let tnnn =
                quinielasEnjugadas[i].num.trim() +
                quinielasEnjugadas[j].num.trim() +
                quinielasEnjugadas[k].num.trim();
              let tnni =
                quinielasEnjugadas[i].num.trim() +
                quinielasEnjugadas[j].num.trim() +
                this.invertirNum(quinielasEnjugadas[k].num.trim()).trim();
              let tnii =
                quinielasEnjugadas[i].num.trim() +
                this.invertirNum(quinielasEnjugadas[j].num.trim()).trim() +
                this.invertirNum(quinielasEnjugadas[k].num.trim()).trim();
              let tiii =
                this.invertirNum(quinielasEnjugadas[i].num.trim()).trim() +
                this.invertirNum(quinielasEnjugadas[j].num.trim()).trim() +
                this.invertirNum(quinielasEnjugadas[k].num.trim()).trim();
              tripletas.push(tnnn);
              tripletas.push(tnni);
              tripletas.push(tnii);
              tripletas.push(tiii);
            }
          }
        }
      }
    }
    return tripletas;
  }

  private invertirNum(num) {
    return num[1] + num[0];
  }
  private getCombinPale(n1, n2) {
    let res = [];
    if (n1.trim() === n2.trim()) {
      res.push(n1 + n2);
      res.push(this.invertirNum(n1) + n2);
    } else {
      res.push(n1 + n2);
      res.push(n1 + this.invertirNum(n2));
      res.push(this.invertirNum(n1) + n2);
      res.push(this.invertirNum(n1) + this.invertirNum(n2));
    }
    return res;
  }
  private getQuinielas() {
    let quinielas = [];
    if (
      this.jugadas !== null &&
      this.jugadas !== undefined &&
      this.jugadas.length &&
      this.jugadas.length > 0
    ) {
      for (let item of this.jugadas) {
        if (item.tipo === "Qui") {
          quinielas.push(item);
        }
      }
    }
    return quinielas;
  }

  async addPaleAutoGenerados() {
    this.loanding = true;
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Ingrese el monto de los pales",
      inputs: [
        {
          name: "montoPales",
          type: "number",
          placeholder: "Ingrese el monto",
          attributes: {
            maxlength: 4,
            inputmode: "decimal",
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Confirm Ok");
          },
        },
      ],
    });

    await alert.present();

    const { data } = await alert.onDidDismiss();

    if (
      data &&
      data !== null &&
      data !== undefined &&
      data.values &&
      data.values !== null &&
      data.values != undefined &&
      data.values.montoPales &&
      data.values.montoPales !== null &&
      data.values.montoPales !== undefined
    ) {
      let quinielasEnjugadas = this.getQuinielas();
      if (quinielasEnjugadas !== null && quinielasEnjugadas.length > 1) {
        let pales = this.generatePale(quinielasEnjugadas);
        if (pales !== null && pales.length > 0) {
          pales.forEach((element) => {
            this.addJugada(
              {
                tipo: "Pale",
                num: element.trim(),
                monto: data.values.montoPales,
              },
              false
            );
          });
        }
      }
    }
    this.resetAll();
    this.loanding = false;
  }

  private getLoteriasSeleccionadas() {
    let res = [];
    if (
      this.loteriasDisponibles != null &&
      this.loteriasDisponibles.length > 0
    ) {
      this.loteriasDisponibles.forEach((element) => {
        if (element.selected === true) {
          res.push(element.name);
        }
      });
    }
    return res;
  }

  private getLoteriasSeleccionadasSuperPale() {
    let res = [];

    if (
      this.loteriasDisponiblesParaSuperPale != null &&
      this.loteriasDisponiblesParaSuperPale.length > 0
    ) {
      this.loteriasDisponiblesParaSuperPale.forEach((element) => {
        if (element.selected === true) {
          res.push(element.name);
        }
      });
    }
    return res;
  }

  async addTripleatasAutoGenerados() {
    this.loanding = true;
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Ingrese el monto de las tripletas",
      inputs: [
        {
          name: "montoTripletas",
          type: "number",
          placeholder: "Ingrese el monto",
          attributes: {
            maxlength: 4,
            inputmode: "decimal",
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Confirm Ok");
          },
        },
      ],
    });

    await alert.present();

    const { data } = await alert.onDidDismiss();

    if (
      data &&
      data !== null &&
      data !== undefined &&
      data.values &&
      data.values !== null &&
      data.values != undefined &&
      data.values.montoTripletas &&
      data.values.montoTripletas !== null &&
      data.values.montoTripletas !== undefined
    ) {
      let quinielasEnjugadas = this.getQuinielas();
      if (quinielasEnjugadas !== null && quinielasEnjugadas.length > 2) {
        let tripletas = this.generateTripleta(quinielasEnjugadas);
        if (tripletas !== null && tripletas.length > 0) {
          tripletas.forEach((element) => {
            this.addJugada(
              {
                tipo: "Trip",
                num: element.trim(),
                monto: data.values.montoTripletas,
              },
              false
            );
          });
        }
      }
    }
    this.resetAll();
    this.loanding = false;
  }

  async presentModalLoteriaDisp() {
    this.loanding = true;
    const modal = await this.modalController.create({
      component: LoteriasDisponiblesPage,
      componentProps: { loteriasDisponibles: this.loteriasDisponibles },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.totalM = this.getTotalM();
    this.loanding = false;
  }

  async presentModalLoteriaDispSuperPale() {
    this.loanding = true;
    const modal = await this.modalController.create({
      component: LoteriasDispParaSuperPalePage,
      componentProps: {
        loteriasDisponiblesParaSuperPale: this.loteriasDisponiblesParaSuperPale,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.loteriasDisponiblesParaSuperPale = data;
    this.totalM = this.getTotalM();
    this.loanding = false;
  }

  async pressPrinter() {
    if (this.jugadas.length < 1) {
      await this.presentAlert("Debes de realizar por lo menos una jugada.");
      return;
    }
    if (
      this.loteriasDisponibles.filter((item) => item.selected === true).length <
      1
    ) {
      await this.presentAlert("Debes de seleccionar por lo menos una loteria.");
      return;
    }
    let objToCreateTicket = this.getObjectToCreateTicket();
    console.log("Guardando jugada...", objToCreateTicket);

    this.loanding = true;
    this.jugadasService.createTicket(objToCreateTicket).subscribe((response) => {
      console.log("Resultado del guardado", response);
      this.loanding = false;
      if (response && response.status === "OK") {
        this.limpiarJugadas();
        this.presentAlert("se agrego el ticket");
      }else{
        this.presentAlert(response.message);
        return;
      }
    });

    console.log("jugadas", this.jugadas);
    console.log(
      "loterias",
      this.loteriasDisponibles.filter((item) => item.selected === true)
    );
    console.log("Monto total", this.totalM);
    console.log("loterias super pale", this.loteriasDisponiblesParaSuperPale);
  }

  private getObjectToCreateTicket(){
    let obj={loteryPlays:[],amountTotal:0,lotteries:[], superPaleLotteries:[] };
    obj.loteryPlays = this.prepareDataPlaysLoteriesToSend();
    obj.amountTotal = this.totalM;
    obj.lotteries = this.prepareDataLoteriesToSend();
    obj.superPaleLotteries = this.prepareDataLoteriesForSuperPaleToSend();
    return obj;
  }

  private prepareDataPlaysLoteriesToSend() {
    let res = [];
    this.jugadas.forEach((element) => {
      let obj={type:'',num:'',amount:0};
      obj.type = element.tipo;
      obj.num = element.num;
      obj.amount = element.monto;
      res.push(obj);
    });
    return res;
  }
  private prepareDataLoteriesToSend() {
    let res = [];
    this.loteriasDisponibles
      .filter((item) => item.selected === true)
      .forEach((element) => {
        res.push(element._id);
      });
    return res;
  }
  private prepareDataLoteriesForSuperPaleToSend() {
    let res = [];
    if (
      this.loteriasDisponiblesParaSuperPale.filter(
        (item) => item.selected === true
      ).length > 0
    ) {
      this.loteriasDisponiblesParaSuperPale
        .filter((item) => item.selected === true)
        .forEach((element) => {
          res.push(element._id);
        });
    }
    return res;
  }

  private limpiarJugadas(){
    if(this.loteriasDisponibles.length>0){
      this.loteriasDisponibles.forEach(element => {
        element.selected =false;
      });
    }
    if(this.loteriasDisponiblesParaSuperPale.length>0){
      this.loteriasDisponiblesParaSuperPale.forEach(element => {
        element.selected = false;
      });
    }
    this.totalM = 0;
    this.jugadas = [];
  }

  async presentCopiarTicket() {
    this.loanding = true;
    const modal = await this.modalController.create({
      component: CopiarTicketPage
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if(data!=null){
      this.setJugadaCopiada(data)
    }
    this.loanding = false;
  }

  setJugadaCopiada(data:any):void{
    if(data.loteryPlays && data.loteryPlays.length>0){
      this.limpiarJugadas();
      data.loteryPlays.forEach(element => {
        this.addJugada(
          {
            tipo: element.type,
            num: element.num,
            monto: element.amount,
          },
          false
        );
      });
      this.totalM = this.getTotalM();
    }
  }
}
