import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularTicketPageRoutingModule } from './anular-ticket-routing.module';

import { AnularTicketPage } from './anular-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularTicketPageRoutingModule
  ],
  declarations: [AnularTicketPage]
})
export class AnularTicketPageModule {}
