import { Component } from '@angular/core';
import { MoneyTransferService } from 'app/@core/mock/money-transfer.service';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData5 } from '../../../@core/data/smart-table5';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table5.component5.html',
  styleUrls: ['./smart-table5.component5.scss'],
})
export class SmartTableComponent5 {

  settings = {
    actions : false,
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
      },
      amount: {
        title: 'Amount',
        type: 'number',
      },
      date: {
        title: 'Date',
        type: 'date',
      },
      receiverFullName: {
        title: 'Receiver Name',
        type: 'string',
      },
       receiverPhone: {
        title: 'Receiver Phone',
        type: 'string',
      },
      state: {
        title: 'State',
        type: 'string',
      },
      server: {
        title: 'Server',
        valuePrepareFunction: (server) => {
          return server.login;
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private transferService: MoneyTransferService) { }


  ngOnInit(): void {
    this.transferService.fetchTransfers().subscribe((bills) => {
      const data = bills;
      this.source.load(data)
    });  

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
