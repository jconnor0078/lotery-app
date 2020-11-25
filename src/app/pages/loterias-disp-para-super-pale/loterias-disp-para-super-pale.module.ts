import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoteriasDispParaSuperPalePageRoutingModule } from './loterias-disp-para-super-pale-routing.module';

import { LoteriasDispParaSuperPalePage } from './loterias-disp-para-super-pale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoteriasDispParaSuperPalePageRoutingModule
  ],
  declarations: [LoteriasDispParaSuperPalePage]
})
export class LoteriasDispParaSuperPalePageModule {}
