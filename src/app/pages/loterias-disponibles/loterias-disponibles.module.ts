import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoteriasDisponiblesPageRoutingModule } from './loterias-disponibles-routing.module';

import { LoteriasDisponiblesPage } from './loterias-disponibles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoteriasDisponiblesPageRoutingModule
  ],
  declarations: [LoteriasDisponiblesPage]
})
export class LoteriasDisponiblesPageModule {}
