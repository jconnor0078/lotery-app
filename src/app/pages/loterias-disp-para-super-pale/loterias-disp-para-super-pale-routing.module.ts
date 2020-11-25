import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoteriasDispParaSuperPalePage } from './loterias-disp-para-super-pale.page';

const routes: Routes = [
  {
    path: '',
    component: LoteriasDispParaSuperPalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoteriasDispParaSuperPalePageRoutingModule {}
