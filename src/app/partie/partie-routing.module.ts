import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartiePage } from './partie.page';

const routes: Routes = [
  {
    path: '',
    component: PartiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartiePageRoutingModule {}
