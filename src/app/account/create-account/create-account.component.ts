import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from 'src/app/service/account.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {
  li : any;
  lists : any[] = [];
  managerId :string |null= '';
  cities : string[] = ['Ahmedabad','Rajkot','Bhuj'];
  states : string[] = ['Gujarat','Maharastra','Kerala'];
  countries : string[] = ['India','USA','Canada']; 
  userNanePattern = '^(?=.*[a-zA-Z])(?=.*[0-9_])[a-zA-Z0-9_]+$'
  passwordPattern =  '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\\-_=+{}[\\]|;:\'",.<>/?]).{8,}$';
  addressPattern : RegExp = /^[a-zA-Z0-9\s\.,'-]+$/;
 constructor(private _accountService: AccountService,private _mainService : ServiceService){}

 myForm = new FormGroup({
  role : new FormControl('', [Validators.required]),
  firstName: new FormControl('',[Validators.required,Validators.pattern("[A-Za-z]+")]),
  lastName : new FormControl('',[Validators.required,Validators.pattern("[A-Za-z]+")]),
  userName: new FormControl('',[Validators.required,Validators.pattern(this.userNanePattern)]),
  address1: new FormControl('',[Validators.required,Validators.pattern(this.addressPattern)]),
  address2: new FormControl('',[Validators.required,Validators.pattern(this.addressPattern)]),
  email: new FormControl('',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[cC][oO][mM]$")]),
  city: new FormControl('',[Validators.required]),
  state: new FormControl('',[Validators.required]),
  country: new FormControl('',[Validators.required]),
  postalCode : new FormControl('',[Validators.required,Validators.pattern("^[0-9]+$"),Validators.maxLength(6),Validators.minLength(6)]),
  mobileNo: new FormControl('',[Validators.required,Validators.pattern("^[0-9]+$"),Validators.maxLength(10),Validators.minLength(10)]),
  gender: new FormControl('',[Validators.required]),
  dateOfBirth: new FormControl('',[Validators.required]),
  managerId: new FormControl('',[Validators.required]),
  password: new FormControl('',[Validators.required,Validators.pattern(this.passwordPattern)]),
});

 ngOnInit(): void {
   this.GetAllManagers()
 }
 //Get All Manager For The List of Manager
 GetAllManagers(){
  this._accountService.GetAllManagers().subscribe(data => {
    this.li = data;
    this.lists = this.li.response
    console.log(this.lists);
  });
}

onSubmit(){
  if(this.myForm.valid){
    console.log(this.lists);
    const data = this.myForm.value;
    this._accountService.CreateAccount(data).subscribe((response : any) =>{
      console.log(response);

      if(response.statusCode == 400)
      {
        this._mainService.Toast.fire({ icon: 'error',title: response.message});
      }
      if(response.statusCode == 200)
      {
        this._mainService.Toast.fire({ icon: 'success',title: response.message});
      }

    },error => {
      console.log("Error Occured");
      this._mainService.Toast.fire({icon: 'error', title: 'User Can`t Added!'});
    });
    
    this.myForm.reset();

  }
}
}