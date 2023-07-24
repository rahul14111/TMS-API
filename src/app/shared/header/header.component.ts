import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
    private Route: Router,
    private roleService: RoleService
  ) {}
  role : string|null = '';
  currentUserName: string | null = '';
  ErrorMessage: string | null = '';

  userName() {
    this.currentUserName = this.accountService.getUserName();
    return true;
  }
  
  checkRole(){
    this.role = this.roleService.getRole();
    return true
  }


  //Show Header if user is logged in
  checkLogin() {
    return this.tokenService.isValidToken();
  }

  //when logout btn clicked
  logout() {
    this.accountService.LogOut().subscribe((res: any) => {});
    this.roleService.clearRoleUserId();
    this.Route.navigateByUrl('Sign-In');
  }
}
