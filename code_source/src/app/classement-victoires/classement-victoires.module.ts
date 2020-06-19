import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassementVictoiresPageRoutingModule } from './classement-victoires-routing.module';

import { ClassementVictoiresPage } from './classement-victoires.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassementVictoiresPageRoutingModule
  ],
  declarations: [ClassementVictoiresPage]
})
export class ClassementVictoiresPageModule {}
