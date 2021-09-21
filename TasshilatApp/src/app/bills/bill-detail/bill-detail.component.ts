import { Component, Input } from '@angular/core';
import { Bill } from '../bill.model';
import { BillsService } from '../bills.service';

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent {

  @Input()
  bill: Bill;

  isLoading: boolean = false;

  constructor(private billsService: BillsService) { }

  onPayBill() {
    this.isLoading = true;
    setTimeout(() => {
      this.billsService.updateBill(this.bill.id)
      .subscribe(() => {
        this.isLoading = false;
        this.generarPDF();
      }, error => console.log(error));
    }, 2000);
  }


  generarPDF() {

    const div = document.getElementById('page-wrap');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jspdf('l', 'mm', 'a4', true);

      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'SLOW');

      return doc;
    }).then((doc) => {
      this.bill.paid = true;
      doc.save('bill.pdf');  
    });
  }

}
