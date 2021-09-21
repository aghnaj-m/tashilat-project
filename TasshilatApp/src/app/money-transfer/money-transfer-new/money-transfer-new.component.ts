import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MoneyTransferService } from '../money-transfer.service';
import "jquery";

declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;

@Component({
  selector: 'app-money-transfer-new',
  templateUrl: './money-transfer-new.component.html',
  styleUrls: ['./money-transfer-new.component.css']
})
export class MoneyTransferNewComponent implements OnInit {

  isError = false;
  isLoading = false;

  receiverFullName: string;
  receiverPhoneNumber:string;
  amount: number;

  transactionCode;

  constructor(private transferService: MoneyTransferService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    if(!form.valid)
    {
      this.isError = true;
      this.isLoading = false;
      console.log("Invalid Form");
    }else {
      this.isError = false;
      this.isLoading = true;

      this.receiverFullName = form.value.fullname;
      this.receiverPhoneNumber = form.value.phoneNumber;
      this.amount = +form.value.amount;

      this.transferService.addTransfer(this.amount,this.receiverFullName,this.receiverPhoneNumber,new Date())
        .subscribe(addedTransfer => {
          this.isLoading = false;
          this.transactionCode = addedTransfer.id;
          $(".previous").hide();
        }, error => {
          console.log(error);
        });
    }
  }

  ngAfterViewInit() {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next").click(function () {

      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          next_fs.css({ 'opacity': opacity });
        },
        duration: 500
      });
      setProgressBar(++current);
    });

    $(".previous").click(function () {
      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();

      //Remove class active
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

      //show the previous fieldset
      previous_fs.show();

      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          previous_fs.css({ 'opacity': opacity });
        },
        duration: 500
      });
      setProgressBar(--current);
    });

    function setProgressBar(curStep) {
      var percent = parseFloat(`${(100 / steps)}`) * curStep;
      percent = Number(percent.toFixed());
      $(".progress-bar")
        .css("width", percent + "%")
    }

    $(".submit").click(function () {
      return false;
    })


  }


}
