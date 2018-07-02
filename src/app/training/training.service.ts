import {Injectable} from '@angular/core';
import {Training} from './training.model';
import {Subscription} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {UiService} from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as fromTraining from './training.reducer';
import * as trainingActions from './training.actions';
import {Store} from '@ngrx/store';
import {StartLoading, StopLoading} from '../shared/ui.actions';
import {take} from 'rxjs/operators';

@Injectable()
export class TrainingService {
  private subscriptionsList: Subscription[] = [];
  private availableTrainings: Training[] = [];

  constructor(private db: AngularFirestore,
              private uiService: UiService,
              private uiStore: Store<fromRoot.State>,
              private store: Store<fromTraining.TrainingState>
  ) {
  }

  fetchAvailableTrainings() {
    this.uiStore.dispatch(new StartLoading());
    this.subscriptionsList.push(
      this.db.collection('availableExercises').snapshotChanges().pipe(map(docArr => {
        return docArr.map((doc) => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            exercises: doc.payload.doc.data()['exercises']
          };
        });
      })).subscribe((trainings: Training[]) => {
        this.store.dispatch(new trainingActions.SetAvailableTrainings(trainings));
        this.uiStore.dispatch(new StopLoading());
      }, (error) => {
        this.uiService.showSnackBar('Failed fetching all the trainings. Please try again', null, 3000);
        this.uiStore.dispatch(new StopLoading());
      }));
  }

  startTraining(selectedId: string) {
    this.store.dispatch(new trainingActions.StartTraining(selectedId));
  }

  completeTraining() {
    let userEmail;
    this.store.select(fromRoot.getUserEmail).subscribe((email) => {userEmail = email; })

    this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((training) => {
      this.addToDB({
        ...training,
        user: userEmail,
        state: 'completed',
        date: new Date()
      });
      this.store.dispatch(new trainingActions.StopTraining());
    });
  }

  cancelTraining(progress: number) {
    let userEmail;
    this.store.select(fromRoot.getUserEmail).subscribe((email) => {userEmail = email; })

    this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((training) => {
      this.addToDB({
        ...training,
        user: userEmail,
        duration: training.duration * (progress / 100),
        state: 'cancelled',
        date: new Date()
      });
      this.store.dispatch(new trainingActions.StopTraining());
    });
  }

  fetchPastTrainings() {
    this.subscriptionsList.push(
      this.db.collection('completedTrainings').valueChanges().subscribe((trainings: Training[]) => {
        this.store.dispatch(new trainingActions.SetFinishedTrainings(trainings));
      }));
  }

  addToDB(training: Training) {
    this.db.collection('completedTrainings').add(training);
  }

  clearAllSubscriptions() {
    this.subscriptionsList.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
