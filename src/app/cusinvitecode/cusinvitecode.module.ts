import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CusinvitecodePageRoutingModule } from './cusinvitecode-routing.module';

import { CusinvitecodePage } from './cusinvitecode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CusinvitecodePageRoutingModule
  ],
  declarations: [CusinvitecodePage]
})
export class CusinvitecodePageModule {}
