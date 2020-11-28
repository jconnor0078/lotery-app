import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnularTicketPage } from './anular-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: AnularTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnularTicketPageRoutingModule {}
