import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { SmartTableComponent2 } from './smart-table2/smart-table2.component2';
import { SmartTableComponent3 } from './smart-table3/smart-table3.component3';
import { SmartTableComponent4 } from './smart-table4/smart-table4.component4';
import { SmartTableComponent5 } from './smart-table5/smart-table5.component5';
import { AuthGuard } from '@nebular/auth/auth.guard';


const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'smart-table2',
      component: SmartTableComponent2,
    },
    {
      path: 'smart-table3',
      component: SmartTableComponent3,
      canActivate: [AuthGuard],
    },
    {
      path: 'smart-table4',
      component: SmartTableComponent4,
      canActivate: [AuthGuard],
    },
    {
      path: 'smart-table5',
      component: SmartTableComponent5,
      canActivate: [AuthGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  SmartTableComponent2,
  SmartTableComponent3,
  SmartTableComponent4,
  SmartTableComponent5,


];
