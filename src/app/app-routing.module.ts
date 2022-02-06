import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'spin',
    loadChildren: () => import('./spin/spin.module').then( m => m.SpinPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'prizes',
    loadChildren: () => import('./prizes/prizes.module').then( m => m.PrizesPageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cusinvitecode',
    loadChildren: () => import('./cusinvitecode/cusinvitecode.module').then( m => m.CusinvitecodePageModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
