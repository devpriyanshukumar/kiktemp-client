import { Component, OnInit } from '@angular/core';
import { tableRowsPerPage } from 'src/app/shared/global.constant';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-project-cubicles',
  templateUrl: './project-cubicles.component.html',
  styleUrls: ['./project-cubicles.component.scss']
})
export class ProjectCubiclesComponent implements OnInit {
  isGettingData: boolean = false;
  addingCubicle: boolean = false;
  first: number = 0;
  pageNo: number = 0;
  tableRowsPerPage: number = tableRowsPerPage;
  totalRecords: any;

  cubicleList: any[] = [
    {
      date: '20/10/2023',
      id: 1,
    },
    {
      date: '20/10/2023',
      id: 2,
    },
    {
      date: '20/10/2023',
      id: 3,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addCubicle() {

  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.tableRowsPerPage = event.rows;
  }

}
