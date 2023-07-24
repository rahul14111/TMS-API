import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { RoleService } from '../service/role.service';
import { ServiceService } from '../service/service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private token: TokenService,
    private roleService:RoleService,
    private mainService:ServiceService
  ) {}

  canActivate(): boolean {
    if (this.token.isValidToken()) {
      if(this.roleService.getRole()=="Managers" ||this.roleService.getRole()=="Developers" ||this.roleService.getRole()=="Admin"){
        return true; // User is logged in, allow access
      }
      else{
        this.router.navigateByUrl('/Sign-In');
        this.mainService.Toast.fire({icon:"info",title:"Please Login"})
        return false; // Prevent access
      }
    } else {
      this.router.navigateByUrl('/Sign-In');
      this.mainService.Toast.fire({icon:"info",title:"Please Login"})
      return false; // Prevent access
    }
  }

 
  
}
