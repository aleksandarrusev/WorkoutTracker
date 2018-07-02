import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TrainingComponent} from './training.component';
import {StopTrainingComponent} from './current-training/stop-training/stop-training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {TrainingRoutingModule} from './training-routing/training-routing.module';
import { StoreModule} from '@ngrx/store';
import {trainingReducer} from './training.reducer';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
  declarations: [
    TrainingComponent,
    StopTrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
  ],
  entryComponents: [StopTrainingComponent]

})
export class TrainingModule { }
