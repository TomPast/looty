import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassementNbPartiesPageRoutingModule } from './classement-nb-parties-routing.module';

import { ClassementNbPartiesPage } from './classement-nb-parties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassementNbPartiesPageRoutingModule
  ],
  declarations: [ClassementNbPartiesPage]
})
export class ClassementNbPartiesPageModule {}
