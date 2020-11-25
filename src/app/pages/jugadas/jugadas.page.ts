import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-jugadas',
  templateUrl: './jugadas.page.html',
  styleUrls: ['./jugadas.page.scss'],
})
export class JugadasPage implements OnInit {

  @Input() jugadas;

  constructor(public modalController: ModalController, public alertController: AlertController ) { }

  ngOnInit() {
  }


  async alertToDeleteElement(i) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: 'Alerta: <strong>Esta seguro de eliminar este elemento?</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.remove(i);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteAll(){
    let len = this.jugadas.length;
    if(len>0){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmar!',
        message: 'Alerta: <strong>Esta seguro de limpiar todas las jugadas?</strong>!!!',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Aceptar',
            handler: () => {
            
              this.jugadas.splice(0, len);
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }
  }

  remove(i){
    this.jugadas.splice(i, 1);
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'montoTotal': this.getTotalM()
    });
  }

  private getTotalM(){
    if(this.jugadas!=null && this.jugadas.length>0){
      let sumTotal = 0;
      this.jugadas.forEach(val => {
        sumTotal= sumTotal + parseInt(val.monto);
      });
      return sumTotal;
    }else{
      return 0;
    }
  }

}
