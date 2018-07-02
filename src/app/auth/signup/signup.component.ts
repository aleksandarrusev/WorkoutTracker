import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Observable, Subscription} from 'rxjs';
import {UiService} from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;

  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
              private uiService: UiService,
              private store: Store<fromRoot.State>) {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getFullYear() - 18);
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

  }
  onSubmit(form) {
    this.authService.signUp({
      email: form.value.email,
      password: form.value.password
    });
  }

}
