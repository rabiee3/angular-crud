import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface ICV_ViewModel {
  id: number | null;
  name: string;
  fullname: string;
  cityname: string;
  email: string;
  mobilenumber: string;
}

const CV_viewModel: ICV_ViewModel = {
  id: null,
  name: 'Name',
  fullname: 'Full Name',
  cityname: 'City Name',
  email: 'Email',
  mobilenumber: 'string'
};

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html'
})
export class CvListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  cvForm: FormGroup;
  isEditCV: boolean = false;
  modalRef!: BsModalRef;
  data: ICV_ViewModel[] = [];
  displayedPlaceholders: string[] = Object.values(CV_viewModel);
  displayedColumns: string[] = Object.keys(CV_viewModel);
  dataSource = new MatTableDataSource<ICV_ViewModel>([]);
  currentPage: number = 0;
  pageSize: number = 3;
  pageSizeOptions: number[] = [];
  totalRows = 0;
  responseData = {
    items: [
      {
        id: 1,
        name: 'Ali',
        personalInformationId: 1,
        experienceInformationId: 0,
        personalInformation: {
          id: 1,
          fullName: 'Jaber',
          cityName: 'Fayoum',
          email: 'alimjbr1@gmail.com',
          mobileNumber: '01062701022',
          cvId: 1
        },
        experienceInformation: [
          {
            id: 2,
            companyName: 'ElevateTCS',
            city: 'Cairo',
            companyField: 'Telecom',
            cvId: 5
          }
        ]
      },
      {
        id: 2,
        name: 'Ali',
        personalInformationId: 1,
        experienceInformationId: 0,
        personalInformation: {
          id: 1,
          fullName: 'Jaber',
          cityName: 'Fayoum',
          email: 'alimjbr1@gmail.com',
          mobileNumber: '01062701022',
          cvId: 1
        },
        experienceInformation: [
          {
            id: 2,
            companyName: 'ElevateTCS',
            city: 'Cairo',
            companyField: 'Telecom',
            cvId: 5
          }
        ]
      },
      {
        id: 3,
        name: 'Ali',
        personalInformationId: 1,
        experienceInformationId: 0,
        personalInformation: {
          id: 1,
          fullName: 'Jaber',
          cityName: 'Fayoum',
          email: 'alimjbr1@gmail.com',
          mobileNumber: '01062701022',
          cvId: 1
        },
        experienceInformation: [
          {
            id: 2,
            companyName: 'ElevateTCS',
            city: 'Cairo',
            companyField: 'Telecom',
            cvId: 5
          }
        ]
      },
    ],
    metaData: {
      pageCount: 1,
      totalItemCount: 5,
      pageNumber: 0,
      pageSize: 3,
      hasPreviousPage: false,
      hasNextPage: false,
      isFirstPage: true,
      isLastPage: true,
      firstItemOnPage: 1,
      lastItemOnPage: 1
    }
  };

  constructor(
    private fb: FormBuilder,

    private modalService: BsModalService
  ) {
    this.cvForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      fullname: [null, [Validators.required]],
      cityname: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobilenumber: [null, [Validators.required]]
    });
  }

  //get device form controls
  get d() {
    return this.cvForm.controls;
  }

  ngOnInit(): void {
    this.getData();

    this.displayedColumns.push('actions');
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  formatData(data: any) {
    return data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        fullname: item.personalInformation.fullName,
        cityname: item.personalInformation.cityName,
        email: item.personalInformation.email,
        mobilenumber: item.personalInformation.mobileNumber
      };
    });
  }

  getData() {
    this.totalRows = this.responseData.metaData.totalItemCount;

    if (this.paginator) {
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = this.totalRows;
    }

    const offset = this.currentPage * this.pageSize;
    const limit = this.pageSize;

    console.log('offset:' + offset);
    console.log('limit' + limit);

    
    this.dataSource = new MatTableDataSource(
      this.formatData(this.responseData.items)
    );
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getData();
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
