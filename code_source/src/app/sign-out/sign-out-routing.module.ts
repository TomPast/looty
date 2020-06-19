import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignOutPage } from './sign-out.page';

const routes: Routes = [
  {
    path: '',
    component: SignOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignOutPageRoutingModule {}
