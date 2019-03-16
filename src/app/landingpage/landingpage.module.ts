import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingpagePage } from './landingpage.page';
import { LandingPageRoutingModule } from './landingpage.router.module';

// const routes: Routes = [
//   {
//     path: '',
//     component: LandingpagePage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(routes)
    LandingPageRoutingModule
  ],
  declarations: [LandingpagePage]
})
export class LandingpagePageModule {}
