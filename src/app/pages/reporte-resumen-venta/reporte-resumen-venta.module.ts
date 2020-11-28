import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteResumenVentaPageRoutingModule } from './reporte-resumen-venta-routing.module';

import { ReporteResumenVentaPage } from './reporte-resumen-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteResumenVentaPageRoutingModule
  ],
  declarations: [ReporteResumenVentaPage]
})
export class ReporteResumenVentaPageModule {}
