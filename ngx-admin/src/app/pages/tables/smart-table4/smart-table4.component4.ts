import { Component, OnInit } from '@angular/core';
import { BillsService } from 'app/@core/mock/bills.service';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData4 } from '../../../@core/data/smart-table4';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table4.component4.html',
  styleUrls: ['./smart-table4.component4.scss'],
})
export class SmartTableComponent4 implements OnInit{

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
      deadline: {
        title: 'Deadline',
        type: 'date',
      },
       paid: {
        title: 'Paid',
        type: 'boolean',
      },
      client_number: {
        title: 'Client number',
        type: 'number',
      },
      contract_number: {
        title: 'Contract number',
        type: 'number',
      },
      server: {
        title: 'Server',
        valuePrepareFunction: (server) => {
          return server.login;
      }
      },
      type: {
        title: 'Type',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private billsService: BillsService) { }


  ngOnInit(): void {
    this.billsService.fetchBills().subscribe((bills) => {
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
