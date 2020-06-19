import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReglePage } from './regle.page';

const routes: Routes = [
  {
    path: '',
    component: ReglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglePageRoutingModule {}
