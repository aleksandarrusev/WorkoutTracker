import { NgModule } from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing/auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule,
  ],
  declarations: [
    SignupComponent,
    SigninComponent,
  ],
  exports: [],
})
export class AuthModule { }
