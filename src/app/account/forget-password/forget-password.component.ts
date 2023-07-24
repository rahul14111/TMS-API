import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { ServiceService } from 'src/app/service/service.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  constructor(
    private _accountService: AccountService,
    private _route: Router,
    private _mainService: ServiceService
  ) {}

  email: string = '';

  submitForm(emailForm: NgForm) {
    this._accountService.ForgetPassword(this.email).subscribe(
      (response: any) => {
        console.log(response);
        if (response.statusCode == 200) {
          this._mainService.Toast.fire({
            icon: 'success',
            title: 'Email send successfully! Please Check Your Email',
          });

          this._route.navigateByUrl('resetPassword');
        }

        if (response.statusCode == 400) {
          this._mainService.Toast.fire({
            icon: 'error',
            title: response.message,
          });
        }
        if (response.statusCode == 500) {
          this._mainService.Toast.fire({
            icon: 'error',
            title: response.message,
          });
        }
      },
      (error: any) => {
        this._mainService.Toast.fire({
          icon: 'error',
          title: 'Something Went Wrong!',
        });
      }
    );

    emailForm.reset();
  }
}
