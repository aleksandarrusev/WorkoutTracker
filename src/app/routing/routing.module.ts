import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {TrainingComponent} from '../training/training.component';
import {AuthGuard} from '../auth/auth.guard';
import {AuthModule} from '../auth/auth.module';


const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'training', loadChildren: '../training/training.module#TrainingModule', canLoad: [AuthGuard]},

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [
    AuthGuard
  ]
})
export class RoutingModule { }
