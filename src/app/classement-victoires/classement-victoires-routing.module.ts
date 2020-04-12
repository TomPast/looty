import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassementVictoiresPage } from './classement-victoires.page';

const routes: Routes = [
  {
    path: '',
    component: ClassementVictoiresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassementVictoiresPageRoutingModule {}
