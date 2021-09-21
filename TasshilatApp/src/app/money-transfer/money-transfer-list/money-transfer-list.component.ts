import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Transfer } from '../money-transfer.model';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MoneyTransferService } from '../money-transfer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-money-transfer-list',
  templateUrl: './money-transfer-list.component.html',
  styleUrls: ['./money-transfer-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MoneyTransferListComponent implements OnInit {

  isLoading: boolean = false;

  TRANSFERS_DATA: Transfer[] = [];
  transferSub: Subscription;

  columnsToDisplay = ['id', 'amount', 'receiverFullName', 'date', 'state'];
  dataSource = new MatTableDataSource<Transfer>(this.TRANSFERS_DATA);
  expandedElement: Transfer | null;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private transfersService: MoneyTransferService,
    private router: Router) { }

  ngOnInit() {

    this.transfersService.fetchTransfers().subscribe(() => {
      // this.isLoading = false;
    });

    this.transferSub = this.transfersService.transfers.subscribe(transfers => {
      this.dataSource.data = transfers;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddTransfer()
  {
    this.router.navigate(['/','money-transfer','new'])
  }

  confirmReceive(code:string)
  {
    this.isLoading = true;
    this.transfersService.updateBill(code)
    .subscribe(response => {
      console.log(response);
      this.isLoading = false;
    },error => console.log(error));
  }

}
