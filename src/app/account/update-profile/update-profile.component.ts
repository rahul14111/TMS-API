import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { ServiceService } from 'src/app/service/service.service';
import { RoleService } from 'src/app/service/role.service';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  constructor(
    private _accountService: AccountService,
    private _mainService: ServiceService,
    private _roleService:RoleService
  ) {}

  cities: string[] = ['Ahmedabad', 'Rajkot', 'Bhuj'];
  states: string[] = ['Gujarat', 'Maharastra', 'Kerala'];
  countries: string[] = ['India', 'USA', 'Canada'];
  addressPattern: RegExp = /^[a-zA-Z0-9\s\.,'-]+$/;
  userNamePattern = '^(?=.*[a-zA-Z])(?=.*[0-9_])[a-zA-Z0-9_]+$'
  userId = this._roleService.getUserId();

  ngOnInit(): void {
    this.getUserDetails();
  }

  myForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z]+'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z]+'),
    ]),
    address1: new FormControl('', [
      Validators.required,
      Validators.pattern(this.addressPattern),
    ]),
    address2: new FormControl('', [
      Validators.required,
      Validators.pattern(this.addressPattern),
    ]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('',[Validators.required]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.maxLength(6),
      Validators.minLength(6),
    ]),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.userNamePattern),
    ]),
  });

  getUserDetails() {
    this._accountService.UserInfo(this.userId).subscribe((response: any) => {
      console.log(response);
      this.myForm.get('firstName')?.setValue(response.response.firstName);
      this.myForm.get('lastName')?.setValue(response.response.lastName);
      this.myForm.get('address1')?.setValue(response.response.address1);
      this.myForm.get('address2')?.setValue(response.response.address2);
      this.myForm.get('mobileNo')?.setValue(response.response.mobileNo);
      this.myForm.get('postalCode')?.setValue(response.response.postalCode);
      this.myForm.get('email')?.setValue(response.response.email);
      this.myForm.get('userName')?.setValue(response.response.userName);
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const data = this.myForm.value;
      this._accountService.UpdateProfile(data).subscribe(
        (response: any) => {
          if (response.statusCode == 400) {
            this._mainService.Toast.fire({
              icon: 'success',
              title: response.message,
            });
          }

          if (response.statusCode == 200) {
            this._mainService.Toast.fire({
              icon: 'success',
              title: response.message,
            });
            localStorage.setItem('userName',data.firstName+" "+data.lastName);
            this.getUserDetails();
          }
        },

        (error) => {
          console.log('Error Occured!');
          this._mainService.Toast.fire({
            icon: 'error',
            title: 'Your Profile Can`t Update!',
          });
        }
      );

      this.myForm.reset();
    }
  }
}
