import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { RefillService } from '../phone-refill.service';
import "jquery";

declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;


@Component({
  selector: 'app-phone-refill-start',
  templateUrl: './phone-refill-start.component.html',
  styleUrls: ['./phone-refill-start.component.css']
})
export class PhoneRefillStartComponent implements AfterViewInit {

  isLoading: boolean = true;
  error: boolean = false;

  operator: string;
  phoneNumber: string;
  amount: number;
  offer: string;

  constructor(private refillService: RefillService,
    private clientService: ClientService) { }

  onSubmit(form: NgForm) {
    this.operator = $(".activeLinkMT p").html() || $(".activeLinkINWI p").html() || $(".activeLinkOrange p").html(); 
    if (form.valid && this.operator) {
      this.error = false;
      this.isLoading = true;

      this.phoneNumber = form.value.phoneNumber;
      this.amount = +form.value.amount;
      this.offer = form.value.offer;

      console.log(this.phoneNumber, this.operator);
      this.clientService.addClient(new Client(this.phoneNumber, this.operator))
        .subscribe(() => {
          this.refillService.addRefill(
            this.amount,
            this.offer,
            new Date(),
            new Client(this.phoneNumber, this.operator)
          )
            .subscribe(resp => {
              this.isLoading = false;
              $(".previous").hide();
            }, error => {
              console.log(error);
            });
        },
          error => {
            console.log(error);
          }
        );

    } else {
      this.error = true;
      this.isLoading = false;
      console.log("Invalid Form");
    }

    // this.refillService.fetchRefills().subscribe(resp => {
    //   console.log('response >',resp);
    // },error => console.log(error));
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

    $(".operators-container a").click(function () {
      $(".operators-container a").find(".card").removeClass("activeLinkMT");
      $(".operators-container a").find(".card").removeClass("activeLinkINWI");
      $(".operators-container a").find(".card").removeClass("activeLinkOrange");
      $(".operators-container a").find("p").css("color", "");

      if ($($(this).find("p")).html() == "Maroc Telecom") {
        $(this).find(".card").addClass("activeLinkMT");
        $(this).find("p").css("color", "white");
      }else if($($(this).find("p")).html() == "INWI")
      {
        $(this).find(".card").addClass("activeLinkINWI");
        $(this).find("p").css("color", "white");
      }else {
        $(this).find(".card").addClass("activeLinkOrange");
        $(this).find("p").css("color", "white");
      }
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
