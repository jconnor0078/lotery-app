import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopiarTicketPage } from './copiar-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: CopiarTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopiarTicketPageRoutingModule {}
