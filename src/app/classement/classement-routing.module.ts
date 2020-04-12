import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassementPage } from './classement.page';

const routes: Routes = [
  {
    path: 'classement',
    component: ClassementPage,
    children: [
      {
        path:'classement-victoires',
        loadChildren: () => import('../classement-victoires/classement-victoires.module').then( m => m.ClassementVictoiresPageModule)
      },
      {
        path:'classement-defaites',
        loadChildren: () => import('../classement-defaites/classement-defaites.module').then( m => m.ClassementDefaitesPageModule)
      },
      {
        path:'classement-nb-parties',
        loadChildren: () => import('../classement-nb-parties/classement-nb-parties.module').then( m => m.ClassementNbPartiesPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'classement/classement-victoires',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassementPageRoutingModule {}
