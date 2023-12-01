import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

interface ICV_ViewModel {
  id?: number;
  name: string;
  fullname: string;
}

const CV_viewModel: ICV_ViewModel = {
  id: 1,
  name: 'CV Name',
  fullname: 'Full Name'
};

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html'
})
export class CvListComponent implements OnInit {
  cvForm: FormGroup;
  isEditCV: boolean = false;
  modalRef!: BsModalRef;

  data: ICV_ViewModel[] = [];
  displayedPlaceholders: string[] = Object.values(CV_viewModel);
  displayedColumns: string[] = Object.keys(CV_viewModel);

  dummyData = [
    { id: 1, name: 'Ali', fullname: 'Ali Mohamed' },
    { id: 2, name: 'Rabie', fullname: 'Rabie Mohamed' },
    { id: 3, name: 'Salah', fullname: 'Salah Moussa' }
  ];
  dataSource = new MatTableDataSource<ICV_ViewModel>(this.dummyData);

  constructor(
    private fb: FormBuilder,

    private modalService: BsModalService
  ) {
    this.cvForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      cityname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required]]
    });
  }

  //get device form controls
  get d() {
    return this.cvForm.controls;
  }

  ngOnInit(): void {
    this.displayedColumns.push('actions');
    console.log(this.displayedColumns);
  }

  addCV() {
    console.log();
  }

  editCV() {
    console.log();
  }

  deleteCV(row: ICV_ViewModel) {
    console.log(row);
  }

  editCVPopup(row: any, template: TemplateRef<any>) {
    this.isEditCV = true;

    this.d['id'].setValue(row.id);
    this.d['name'].setValue(row.name);
    this.d['fullname'].setValue(row.fullname);
    this.d['cityname'].setValue(row.cityname);
    this.d['email'].setValue(row.email);
    this.d['mobilenumber'].setValue(row.mobilenumber);

    this.modalRef = this.modalService.show(template, {
      class: 'modal-style1 modal-dialog-centered',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  addCVPopup(template: TemplateRef<any>) {
    this.isEditCV = false;
    this.cvForm.reset();
    this.modalRef = this.modalService.show(template, {
      class: 'modal-style1 modal-dialog-centered',
      backdrop: true,
      ignoreBackdropClick: true
    });

    this.modalRef?.onHide?.subscribe(() => {
      console.log('modal closed update table');
    });
  }
}
