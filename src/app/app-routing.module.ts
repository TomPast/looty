import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'mon-compte',
    loadChildren: () => import('./mon-compte/mon-compte.module').then( m => m.MonComptePageModule)
  },
  {
    path: 'classement',
    loadChildren: () => import('./classement/classement.module').then(m => m.ClassementPageModule)
  },
  {
    path: 'regle',
    loadChildren: () => import('./regle/regle.module').then( m => m.ReglePageModule)
  },
  {
    path: 'sign-out',
    loadChildren: () => import('./sign-out/sign-out.module').then( m => m.SignOutPageModule)
  },
  {
    path: 'partie/:GAMEID',
    loadChildren: () => import('./partie/partie.module').then( m => m.PartiePageModule)
  },
  {
    path: 'recherche-partie',
    loadChildren: () => import('./recherche-partie/recherche-partie.module').then( m => m.RecherchePartiePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
