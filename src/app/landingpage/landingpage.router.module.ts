import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpagePage } from './landingpage.page';

const routes: Routes = [
  {
    path: 'landingpage',
    component: LandingpagePage,
    children: [
        {
            path: 'signin',
            children: [
              {
                path: '',
                loadChildren: '../signin/signin.module#SigninPageModule'
              }
            ]
          },   
      {
        path: 'signup',
        children: [
          {
            path: '',
            loadChildren: '../signup/signup.module#SignupPageModule'
          }
        ]
      },
      
      {
        path: '',
        redirectTo: '/landingpage/signin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/landingpage/signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LandingPageRoutingModule {}
