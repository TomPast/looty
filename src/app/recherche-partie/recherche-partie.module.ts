import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecherchePartiePageRoutingModule } from './recherche-partie-routing.module';

import { RecherchePartiePage } from './recherche-partie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecherchePartiePageRoutingModule
  ],
  declarations: [RecherchePartiePage]
})
export class RecherchePartiePageModule {}
