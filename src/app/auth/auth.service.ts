import {Injectable} from '@angular/core';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import {SetAuthenticated, SetUnauthenticated} from './auth.actions';
@Injectable()
export class AuthService {
  private user: User;
  private isAuthenticated: boolean;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private snackBar: MatSnackBar,
              private uiService: UiService,
              private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new SetAuthenticated(user.email));
        this.router.navigate(['/training']) ;
      } else {
        this.store.dispatch(new SetUnauthenticated());
        this.trainingService.clearAllSubscriptions();
        this.router.navigate(['/signin']);
      }
    });
  }

  signUp(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((res) => {
      this.store.dispatch(new UI.StopLoading());

    }).catch((error) => {
      this.store.dispatch(new UI.StartLoading());

      this.uiService.showSnackBar(error.message, null, 3000)
    });
  }

  signIn(authData: AuthData) {
    this.store.dispatch({type: 'START_LOADING'});

    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then((res) => {
      this.store.dispatch(new UI.StopLoading());

    }).catch((error) => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(error.message, null, 3000);
    });

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUser() {
    return {...this.user};
  }

}
