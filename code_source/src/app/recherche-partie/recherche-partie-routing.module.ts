import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecherchePartiePage } from './recherche-partie.page';

const routes: Routes = [
  {
    path: '',
    component: RecherchePartiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecherchePartiePageRoutingModule {}
