import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarTicketPageRoutingModule } from './pagar-ticket-routing.module';

import { PagarTicketPage } from './pagar-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagarTicketPageRoutingModule
  ],
  declarations: [PagarTicketPage]
})
export class PagarTicketPageModule {}
