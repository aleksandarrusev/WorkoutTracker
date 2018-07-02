import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Training} from '../training.model';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {UiService} from '../../shared/ui.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

import {Store} from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private uiService: UiService,
              private uiStore: Store<fromRoot.State>,
              private store: Store<fromTraining.TrainingState>) {
  }

  trainings: Observable<Training[]>;

  ngOnInit() {
    this.trainings = this.store.select(fromTraining.getAvailableTrainings)
    this.isLoading$ = this.uiStore.select(fromRoot.getIsLoading);
    this.fetchAllTrainings();

  }
  fetchAllTrainings() {
    this.trainingService.fetchAvailableTrainings();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.training);
  }

}
