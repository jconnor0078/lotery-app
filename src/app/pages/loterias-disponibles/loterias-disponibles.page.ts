import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-loterias-disponibles',
  templateUrl: './loterias-disponibles.page.html',
  styleUrls: ['./loterias-disponibles.page.scss'],
})
export class LoteriasDisponiblesPage implements OnInit {

  @Input() loteriasDisponibles;

  constructor(public modalController: ModalController, public alertController: AlertController ) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
       
    });
  }

  on_change(item){
    item.selected=!item.selected;
  }

}
