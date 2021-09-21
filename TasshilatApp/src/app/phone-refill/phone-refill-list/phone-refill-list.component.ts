import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Client } from '../client.model';
import { RefillService } from '../phone-refill.service';
import { Refill } from '../refill.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-phone-refill-list',
  templateUrl: './phone-refill-list.component.html',
  styleUrls: ['./phone-refill-list.component.css']
})
export class PhoneRefillListComponent implements OnInit{


  refills: Refill[] = [];
  refillSub: Subscription;

  displayedColumns: string[] = ['client', 'amount', 'offer', 'operator','date'];
  dataSource = new MatTableDataSource<Refill>(this.refills);

  @ViewChild(MatPaginator,{static: false}) 
  paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private refillService: RefillService,
              private router: Router) {}

  ngOnInit() {

    this.refillService.fetchRefills().subscribe(() => {
      // this.isLoading = false;
    });

    this.refillSub = this.refillService.refills.subscribe(refills => {
      this.dataSource.data = refills;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddRefill()
  {
    this.router.navigate(['/','phone-refill','new'])
  }
  

}

