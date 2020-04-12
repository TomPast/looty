import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonComptePage } from './mon-compte.page';

const routes: Routes = [
  {
    path: '',
    component: MonComptePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonComptePageRoutingModule {}
