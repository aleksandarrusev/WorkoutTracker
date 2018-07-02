import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UiService {
  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration
    });

  }

}
