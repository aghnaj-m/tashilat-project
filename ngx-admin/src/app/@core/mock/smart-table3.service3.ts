import { Injectable } from '@angular/core';
import { SmartTableData3 } from '../data/smart-table3';

@Injectable()
export class SmartTableService3 extends SmartTableData3 {

  data = [{
    id: 1,
    amount: 100,
    date: "2021-01-06" ,
    offer: 'JAWAL',
    clientphone: 'IAM',
    serverid: 2,
  },
   {
    id: 2,
    amount: 100,
    date: "2021-01-06" ,
    offer: 'JAWAL',
    clientphone: 'IAM',
    serverid: 2,
  },
   {
    id: 3,
    amount: 100,
    date: "2021-01-06" ,
    offer: 'JAWAL',
    clientphone: 'IAM',
    serverid: 2,
  },
   {
    id: 4,
    amount: 100,
    date: "2021-01-06" ,
    offer: 'JAWAL',
    clientphone: 'IAM',
    serverid: 2,
  },
   {
    id: 5,
    amount: 100,
    date: "2021-01-06" ,
    offer: 'JAWAL',
    clientphone: 'IAM',
    serverid: 2,
  }, {
    id: 6,
    amount: 100,
    date: "2021-01-06" ,
    offer: 'JAWAL',
    clientphone: 'IAM',
    serverid: 2,
  }, {
    id: 7,
    amount: 100,
    date: "2021-01-06" ,
    offer: 'JAWAL',
    clientphone: 'IAM',
    serverid: 2,
  },
    {
      id: 8,
    amount: 100,
    date: "2021-01-06" ,
    offer: 'JAWAL',
    clientphone: 'IAM',
    serverid: 2,
  }];

  getData() {
    return this.data;
  }
}
