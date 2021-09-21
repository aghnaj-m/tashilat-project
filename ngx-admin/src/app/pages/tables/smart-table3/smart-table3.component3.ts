import { Component, OnInit } from '@angular/core';
import { RefillService } from 'app/@core/mock/phone-refill.service';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData3 } from '../../../@core/data/smart-table3';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table3.component3.html',
  styleUrls: ['./smart-table3.component3.scss'],
})
export class SmartTableComponent3 implements OnInit {

  settings = {
    actions: false,
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
        type: 'string',
      },
      clientPhone: {
        title: 'Client phone',
        valuePrepareFunction: (client,trip) => {
          return trip.client.phone;
        }
      },
      clientOperator: {
        title: 'Client operator',
        valuePrepareFunction: (client,trip) => {
          return trip.client.operator;
        }
      },
      offer: {
        title: 'Offer',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'date',
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

  constructor(private refillService: RefillService) { }


  ngOnInit(): void {
    this.refillService.fetchRefills().subscribe((refills) => {
      const data = refills;
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
