import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassementPageRoutingModule } from './classement-routing.module';
import { ClassementPage } from './classement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassementPageRoutingModule,
  ],
  declarations: [ClassementPage]
})
export class ClassementPageModule {}
