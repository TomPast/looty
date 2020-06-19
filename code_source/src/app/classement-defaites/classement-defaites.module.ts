import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassementDefaitesPageRoutingModule } from './classement-defaites-routing.module';

import { ClassementDefaitesPage } from './classement-defaites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassementDefaitesPageRoutingModule
  ],
  declarations: [ClassementDefaitesPage]
})
export class ClassementDefaitesPageModule {}
