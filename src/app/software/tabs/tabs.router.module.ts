import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'software',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'store',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          },
          {
            path: 'product', loadChildren: '../product-detail/product-detail.module#ProductDetailPageModule'
          },
          {
            path: 'product/:id', loadChildren: '../product-detail/product-detail.module#ProductDetailPageModule'
          },
        ]
      },
      {
        path: 'product',
        children: [
          {
            path: '', 
            loadChildren: '../product-detail/product-detail.module#ProductDetailPageModule'
          },
        ]
      },
      {
        path: '',
        redirectTo: 'software/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'software/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
