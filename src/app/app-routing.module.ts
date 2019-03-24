import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'o-shopping', loadChildren: './software/tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './landingpage/landingpage.module#LandingpagePageModule' },
  { path: 'o-shopping-buyer', loadChildren: './buyer/buyertabs/buyertabs.module#BuyerTabsPageModule' },
 
 
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
