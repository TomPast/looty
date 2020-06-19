import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassementDefaitesPage } from './classement-defaites.page';

const routes: Routes = [
  {
    path: '',
    component: ClassementDefaitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassementDefaitesPageRoutingModule {}
