import { Component } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private accountService :AccountService
  ){}
  Username= this.accountService.getUserName()
}
