import { Injectable } from '@angular/core';
import { SmartTableData2 } from '../data/smart-table2';

@Injectable()
export class SmartTableService2 extends SmartTableData2 {

  data = [{
    phone: '0662884444',
    operator: 'IAM',
  }, {
    phone: '0664684444',
    operator: 'ORANGE',
  }, {
    phone: '0665554444',
    operator: 'INWI',
  }, {
    phone: '0762114444',
    operator: 'INWI',
  }, {
    phone: '0662114454',
    operator: 'ORANGE',
  }, {
    phone: '0762114444',
    operator: 'INWI',
  }, {
    phone: '0662114444',
    operator: 'IAM',
  }, {
    phone: '0662114444',
    operator: 'INWI',
  }, {
    phone: '0662114444',
    operator: 'IAM',
  },
    {
      phone: '0662114444',
      operator: 'ORANGE',
  }];

  getData() {
    return this.data;
  }
}
