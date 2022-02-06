import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CusinvitecodePage } from './cusinvitecode.page';

const routes: Routes = [
  {
    path: '',
    component: CusinvitecodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CusinvitecodePageRoutingModule {}
