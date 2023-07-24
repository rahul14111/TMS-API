import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { RoleService } from '../service/role.service';
import { ServiceService } from '../service/service.service';


@Injectable({
  providedIn: 'root'
})
export class roleGuardGuard implements CanActivate {

  url = location.pathname.split("/").pop()
  
  
  constructor(
    private router: Router,
    private roleService:RoleService,
    private mainService:ServiceService
  ) {}

  canActivate(): boolean {
    console.log(this.url);
    
      if(this.roleService.getRole()=="Managers"){
       
        return true; // Managers is logged in, allow access
      }
     else if(this.roleService.getRole()=="Developers"){
        this.router.navigateByUrl('/dev-dashboard');
        this.mainService.Toast.fire({icon:"error",title:"Access Denied"})
        return true; // Prevent access
    }  
    return true;
  }
}
