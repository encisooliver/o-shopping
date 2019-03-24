import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerTabsPageModule } from './buyertabs.module';

const routes: Routes = [
  {
    path: 'buyer',
    component: BuyerTabsPageModule,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../profile/tab1.module#HomePageModule'
          }
        ]
      },
      {
        path: 'market',
        children: [
          {
            path: '',
            loadChildren: '../store/tab2.module#StorePageModule'
          },
          {
            path: 'transaction/:id', 
            loadChildren: '../transaction/transaction.module#TransactionPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'buyer/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'buyer/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BuyerTabsPageRoutingModule {}
