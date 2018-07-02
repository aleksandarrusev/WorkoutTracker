import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop-training/stop-training.component';
import {TrainingService} from '../training.service';
import * as fromTraining from '../training.reducer';
import {Store} from '@ngrx/store';
import {Training} from '../training.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  training: Training;

  constructor(private dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<fromTraining.TrainingState>) {
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((training) => {
        this.training = training;
        const step = (training.duration * 60) / 100;

        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainingService.completeTraining();
            clearInterval(this.timer);
          }
        }, step * 1000);
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelTraining(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });

  }

}
