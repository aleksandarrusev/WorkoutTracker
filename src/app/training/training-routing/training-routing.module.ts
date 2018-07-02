import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {TrainingComponent} from '../training.component';


const routes: Route[] = [
  {path: '', component: TrainingComponent},

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  declarations: [],
  exports: [
    RouterModule
  ],
})
export class TrainingRoutingModule { }
