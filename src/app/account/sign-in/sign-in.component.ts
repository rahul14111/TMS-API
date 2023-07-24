import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { TokenService } from 'src/app/service/token.service';
import { RoleService } from 'src/app/service/role.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  ngOnInit(): void {
    if(this.tokenService.isValidToken())
    {
      if(this.roleService.getRole()=="Managers")
      {
        this.Route.navigateByUrl("dashboard")
      }
      else if(this.roleService.getRole()=="Developers"){
        this.Route.navigateByUrl("dev-dashboard")
      }
    }
  }

  constructor(private accountService:AccountService,private Route:Router, 
    private mainService : ServiceService,
    private tokenService:TokenService,
    private roleService : RoleService){}
  
  responseMessage="";
  loadingResponse= false

  //Login Api + Storing Response in "ServiceService" redirecting According to Role
  sendLoginData(data:any){
    this.responseMessage=''
    this.loadingResponse = true;
    this.accountService.Login(data).subscribe((res :any) => {
      if(res.statusCode != 200){
        this.responseMessage = res.message;
      }else
      {
        this.tokenService.setToken(res.response.token);
        if(res.response.userRole =="Managers"){
          this.Route.navigateByUrl("dashboard");
          console.log(this.accountService.addUserId(res.response.userId));
          console.log(this.accountService.addUserName(res.response.fullName));
          this.responseMessage ="";
        }else if(res.response.userRole =="Developers"){
          
          this.Route.navigateByUrl("dev-dashboard");
          this.accountService.addUserId(res);
          console.log(this.accountService.addUserId(res.response.userId));
          console.log(this.accountService.addUserName(res.response.fullName));
          this.responseMessage ="";
        }else {
         console.log("Unknown Role : "+res.response.userRole);
        }
        this.responseMessage ="";

        this.roleService.setRole(res.response.userRole);
        //console.log(res.response.userId);
        this.roleService.setUserId(res.response.userId);
        this.mainService.loginResponse = res;
      }
      this.loadingResponse = false;
    },(error:any)=>{
      if(error.status==0){
        this.responseMessage=''
        this.responseMessage = "Server is not responding";
        this.loadingResponse = false;
      }
    });
  }  
}