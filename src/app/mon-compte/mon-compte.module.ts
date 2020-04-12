import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonComptePageRoutingModule } from './mon-compte-routing.module';

import { MonComptePage } from './mon-compte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonComptePageRoutingModule
  ],
  declarations: [MonComptePage]
})
export class MonComptePageModule {}
