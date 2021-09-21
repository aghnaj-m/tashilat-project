import { Injectable } from '@angular/core';
import { SmartTableData5 } from '../data/smart-table5';

@Injectable()
export class SmartTableService5 extends SmartTableData5 {

  data = [{
    id: 1,
    amount: 100,
    date: "2021-01-06" ,
    receivername: "dadad",
    receiverphone: "dadad",
    state: "in hold",
    serverid:1,
  },
   {
    id: 2,
    amount: 100,
    date: "2021-01-06" ,
    receivername: "dadad",
    receiverphone: "dadad",
    state: "in hold",
    serverid:1,

  },
   {
    id: 3,
    amount: 100,
    date: "2021-01-06" ,
    receivername: "dadad",
    receiverphone: "dadad",
    state: "in hold",
    serverid:1,

  },
   {
    id: 4,
    amount: 100,
    date: "2021-01-06" ,
    receivername: "dadad",
    receiverphone: "dadad",
    state: "in hold",
    serverid:1,

  },
    {
      id: 6,
      amount: 100,
      date: "2021-01-06" ,
      receivername: "dadad",
      receiverphone: "dadad",
      state: "in hold",
      serverid:1,
  }];

  getData() {
    return this.data;
  }
}
