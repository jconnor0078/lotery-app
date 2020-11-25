import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoteriasDisponiblesPage } from './loterias-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: LoteriasDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoteriasDisponiblesPageRoutingModule {}
