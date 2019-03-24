import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BuyerTabsPageRoutingModule } from './buyertabs.router.module';

import { BuyerTabsPage } from './buyertabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BuyerTabsPageRoutingModule
  ],
  declarations: [BuyerTabsPage]
})
export class BuyerTabsPageModule {}
