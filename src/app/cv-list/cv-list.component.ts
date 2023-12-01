import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface ICV_ViewModel {
  cvname: string;
  fullname: string;
}

const CV_viewModel: ICV_ViewModel = {
  cvname: 'CV Name',
  fullname: 'Full Name'
};

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html'
})
export class CvListComponent implements OnInit {
  dummyData = [
    { cvname: 'Ali', fullname: 'Ali Mohamed' },
    { cvname: 'Rabie', fullname: 'Rabie Mohamed' },
    { cvname: 'Salah', fullname: 'Salah Moussa' }
  ];
  data: ICV_ViewModel[] = [];
  displayedPlaceholders: string[] = Object.values(CV_viewModel);
  displayedColumns: string[] = Object.keys(CV_viewModel);
  dataSource = new MatTableDataSource<ICV_ViewModel>(this.dummyData);
  constructor() {}
  ngOnInit(): void {
    this.displayedColumns.push('actions');
    console.log(this.displayedColumns);
  }

  addCV(row: ICV_ViewModel) {
    console.log(row);
  }

  editCV(row: ICV_ViewModel) {
    console.log(row);
  }
  
  deleteCV(row: ICV_ViewModel) {
    console.log(row);
  }
}
