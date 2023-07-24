import { Component } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-dev-dashboard',
  templateUrl: './dev-dashboard.component.html',
  styleUrls: ['./dev-dashboard.component.css']
})
export class DevDashboardComponent {
  constructor(
    private accountService :AccountService
  ){}
  Username= this.accountService.getUserName()
}
