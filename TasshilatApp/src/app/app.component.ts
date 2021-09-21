import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TasshilatApp';

  constructor(private http: HttpClient){}

  ngOnInit()
  {
    // this.http.get("http://localhost:8081/refills/all")
    //   .subscribe(response => {
    //     console.log(response);
    // },error => {
    //   console.log(error);
    // })
  }


}
