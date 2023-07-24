import { Component } from '@angular/core';
import { RoleService } from 'src/app/service/role.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private roleService: RoleService,
    private tokenService:TokenService
  ) { }
  role:string|null="";
  
  ngOnInit(): void {
    
   this.role= this.roleService.getRole();
  }

  checkLogin() {
    return this.tokenService.isValidToken();
  }
}
