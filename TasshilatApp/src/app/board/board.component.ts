import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private cards:string[][] = [
    ["WATER BILL","../../assets/svg/maintenance.svg","/bills/water"],
    ["ELECTRICITY BILL","../../assets/svg/plug.svg","/bills/electricity"],
    ["MONEY TRANSFER","../../assets/svg/money-transfer.svg","/money-transfer"],
    ["PHONE REFILL","../../assets/svg/phone.svg","/phone-refill"]
  ];

  constructor() { }

  ngOnInit() {
  }

}
