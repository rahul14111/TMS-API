import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Userreg } from 'src/app/models/userreg';
import { AccountService } from 'src/app/service/account.service';
import { RoleService } from 'src/app/service/role.service';
@Component({
  selector: 'app-getalluser',
  templateUrl: './getalluser.component.html',
  styleUrls: ['./getalluser.component.css'],
})
export class GetalluserComponent implements OnInit {
  constructor(private _accountService: AccountService,private _roleService : RoleService) {}
//For get All Users
  getallUsers: any;
  listOfUsers: any[] = [];
//For get All Managers
  getAllManagers: any;
  getListofManager: any[] = []

  ngOnInit(): void {
    this.getAllUser();
    this.getAllManager();
    
  }

  getAllManager() {
    this._accountService.GetAllManagers().subscribe((data) => {
      this.getAllManagers = data;
      this.getListofManager = this.getAllManagers.response;
    });
  }
  
  onChangeStatus(id:any){
    this._accountService.UpdateUserStatus(id).subscribe((response : any)=>{
      this.getAllUser();
    });   
  }

  getAllUser(): void {
    this._accountService.GetAllUser().subscribe((data:any) => {
      this.getallUsers = data;
      this.listOfUsers = this.getallUsers.response;
    });
  }
}
