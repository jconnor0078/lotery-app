import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CopiarTicketPageRoutingModule } from './copiar-ticket-routing.module';

import { CopiarTicketPage } from './copiar-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopiarTicketPageRoutingModule
  ],
  declarations: [CopiarTicketPage]
})
export class CopiarTicketPageModule {}
