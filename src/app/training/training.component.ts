import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TrainingService} from './training.service';
import * as fromTraining from './training.reducer';
import * as trainingActions from './training.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining$: Observable<boolean>;

  constructor(private traiingService: TrainingService,
              private store: Store<fromTraining.TrainingState>) {
  }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsActive);
  }


}
