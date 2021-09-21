import { Injectable } from '@angular/core';
import { SmartTableData4 } from '../data/smart-table4';
import { Bill } from './bill.model';
import { BillsService } from './bills.service';

@Injectable()
export class SmartTableService4 extends SmartTableData4 {

  data : Bill[] = [];

  getData() {
    return this.data;
  }
}
