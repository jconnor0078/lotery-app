import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadasPage } from './jugadas.page';

const routes: Routes = [
  {
    path: '',
    component: JugadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadasPageRoutingModule {}
