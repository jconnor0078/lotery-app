import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadasPageRoutingModule } from './jugadas-routing.module';

import { JugadasPage } from './jugadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadasPageRoutingModule
  ],
  declarations: [JugadasPage]
})
export class JugadasPageModule {}
