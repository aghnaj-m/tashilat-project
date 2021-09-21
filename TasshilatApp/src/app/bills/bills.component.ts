import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';


import { Bill } from './bill.model';
import { BillsService } from './bills.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class BillsComponent implements OnInit {

  billsType: string;

  BILLS_DATA: Bill[] = [];
  billSub: Subscription;

  columnsToDisplay = ['contract_number', 'amount', 'date', 'paid'];
  dataSource = new MatTableDataSource<Bill>(this.BILLS_DATA);
  expandedElement: Bill | null;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private billsService: BillsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.billsType = params['type'];

        if(this.billsType != 'water' && this.billsType != 'electricity')
        {
          this.router.navigate(['/','board']);
          return;
        }
        
        this.billsService.fetchBills().subscribe(() => {
          // this.isLoading = false;
        });

        this.billSub = this.billsService.bills.subscribe(bills => {
          let typedBills = bills.filter(bill => bill.type == this.billsType);
          this.dataSource.data = typedBills;
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}






// export class BillsComponent implements OnInit, AfterViewInit {

//   bills: Bill[] = [];
//   billSub: Subscription;

//   displayedColumns: string[] = ['contract_number', 'amount', 'date', 'paid'];
//   dataSource = new MatTableDataSource<Bill>(this.bills);

//   @ViewChild(MatPaginator,{static: false}) 
//   paginator: MatPaginator;

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }


//   constructor(private billsService: BillsService) {}

//   ngOnInit() {

//     this.billsService.fetchBills().subscribe(() => {
//       // this.isLoading = false;
//     });

//     this.billSub = this.billsService.bills.subscribe(bills => {
//       this.dataSource.data = bills;
//     });
//   }

// }
