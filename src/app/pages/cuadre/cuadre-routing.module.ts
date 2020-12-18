import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuadrePage } from './cuadre.page';

const routes: Routes = [
  {
    path: '',
    component: CuadrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuadrePageRoutingModule {}
