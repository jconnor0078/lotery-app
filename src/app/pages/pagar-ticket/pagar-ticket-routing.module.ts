import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarTicketPage } from './pagar-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: PagarTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarTicketPageRoutingModule {}
