import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReglePageRoutingModule } from './regle-routing.module';

import { ReglePage } from './regle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReglePageRoutingModule
  ],
  declarations: [ReglePage]
})
export class ReglePageModule {}
