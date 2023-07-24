import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleService } from './role.service';
import { ServiceService } from './service.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: any =null;
  
  helper = new JwtHelperService();
  constructor(
    private roleService:RoleService,
    private mainService:ServiceService  
  ) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  clearToken(): void {
    localStorage.removeItem('token');
    this.token = null;
  }
  
  isValidToken(): boolean {
    // const decodedToken = this.helper.decodeToken(this.token);
    if (this.helper.isTokenExpired(this.getToken())) {
      return false
    } 
    else{
      if(this.roleService.getRole()!="Developers"&&this.roleService.getRole()!="Managers"&&this.roleService.getRole()!="Admin")
      {        
        this.roleService.clearRoleUserId()
        console.log('Invalid Role');
        return false
      }else{
        return true
      }
      //return true
    }
  }
  
}
