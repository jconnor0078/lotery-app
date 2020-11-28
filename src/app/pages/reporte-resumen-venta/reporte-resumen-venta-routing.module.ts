import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteResumenVentaPage } from './reporte-resumen-venta.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteResumenVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteResumenVentaPageRoutingModule {}
