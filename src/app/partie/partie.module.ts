import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartiePageRoutingModule } from './partie-routing.module';

import { PartiePage } from './partie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartiePageRoutingModule
  ],
  declarations: [PartiePage]
})
export class PartiePageModule {}
