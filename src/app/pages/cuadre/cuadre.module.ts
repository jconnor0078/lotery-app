import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuadrePageRoutingModule } from './cuadre-routing.module';

import { CuadrePage } from './cuadre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuadrePageRoutingModule
  ],
  declarations: [CuadrePage]
})
export class CuadrePageModule {}
