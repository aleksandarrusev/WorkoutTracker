import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Training} from '../training.model';
import {TrainingService} from '../training.service';
import * as fromTraining from './../training.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'duration', 'state', 'user'];
  dataSource = new MatTableDataSource<Training>();

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.TrainingState>) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedTrainings).subscribe((trainings) => {
      this.dataSource.data = trainings;

    });
    this.trainingService.fetchPastTrainings();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
