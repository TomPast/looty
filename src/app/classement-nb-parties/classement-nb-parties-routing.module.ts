import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassementNbPartiesPage } from './classement-nb-parties.page';

const routes: Routes = [
  {
    path: '',
    component: ClassementNbPartiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassementNbPartiesPageRoutingModule {}
