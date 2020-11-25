import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-loterias-disp-para-super-pale',
  templateUrl: './loterias-disp-para-super-pale.page.html',
  styleUrls: ['./loterias-disp-para-super-pale.page.scss'],
})
export class LoteriasDispParaSuperPalePage implements OnInit {

  @Input() loteriasDisponiblesParaSuperPale;

  constructor(public modalController: ModalController, public alertController: AlertController ) { }


  ngOnInit() {
  }

  async dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    let countLoterySelected= this.countLoteriaSeleccionadas();
    if(countLoterySelected!==2 && countLoterySelected!==0){
      await this.presentAlert("Debe de seleccionar dos (2) loterias.");
      return;
    } 
    this.modalController.dismiss(this.loteriasDisponiblesParaSuperPale);
  }

  on_change(item){
    item.selected=!item.selected;
  }

  countLoteriaSeleccionadas(){
    let i = 0;
    this.loteriasDisponiblesParaSuperPale.forEach(element => {
      if (element.selected===true){
        i++;
      }
    });
    return i;
  }

  async presentAlert(err) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Ha ocurrido un problema',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

}
