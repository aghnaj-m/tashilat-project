import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import "jquery";

declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit {

  constructor(private authService: AuthService,
    private router: Router) { }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.authenticate(username, password);
    form.reset();
  }

  authenticate(username: string, password: string) {
    // this.isLoading = true;

    this.authService.login(username, password).subscribe(
      resData => {
        console.log("[authComp]:sucess", resData);
        this.showLoginSucces();
        setTimeout(() => {
          if(username === "bensitel-h")
            window.location.href = "http://localhost:4210/pages/iot-dashboard";
          else
            this.router.navigateByUrl('/board');  
        }, 1000);
        //this.isLoading = false;
        
      },
      errRes => {
        this.showLoginError();
      }
    );
  }

  showLoginError() {
    $(".submit i").removeAttr('class').addClass("fa fa-exclamation").css({ "color": "#fff" });
    $(".submit").css({ "background": "#E74C3C", "border-color": "#E74C3C" });
    $(".feedback").hide();
    $(".error-feedback").show().animate({ "opacity": "1", "bottom": "-80px" }, 400);
    $("input").css({ "border-color": "#E74C3C" });
    return false;

  }

  showLoginSucces() {
    $(".submit i").removeAttr('class').addClass("fa fa-check").css({ "color": "#fff" });
    $(".submit").css({ "background": "#2ecc71", "border-color": "#2ecc71" });
    $(".error-feedback").hide();
    $(".feedback").show().animate({ "opacity": "1", "bottom": "-80px" }, 400);
    $("input").css({ "border-color": "2ecc71" });
    return false;
  }

  ngAfterViewInit() {

    $(".input").focusin(function () {
      $(this).find("span").animate({ "opacity": "0" }, 200);
    });

    $(".input").focusout(function () {
      $(this).find("span").animate({ "opacity": "1" }, 300);
    });
  }


}
