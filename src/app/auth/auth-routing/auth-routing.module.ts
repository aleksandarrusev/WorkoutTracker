import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {SignupComponent} from '../signup/signup.component';
import {SigninComponent} from '../signin/signin.component';
import {AuthGuard} from '../auth.guard';

const routes: Route[] = [
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ],
  providers: [
  AuthGuard
]

})
export class AuthRoutingModule { }
