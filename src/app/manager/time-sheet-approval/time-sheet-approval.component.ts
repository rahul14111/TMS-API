import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskAssignmentService } from 'src/app/service/TaskAssignment/task-assignment.service';
import { TimeSheetApprovalService } from 'src/app/service/TimeSheetApproval/time-sheet-approval.service';
import { TimeSheetService } from 'src/app/service/Timesheet/time-sheet.service';
import { RoleService } from 'src/app/service/role.service';
import { ServiceService } from 'src/app/service/service.service';
import {ITimeSheetApproval} from 'src/app/models/ITimeSheetApproval'
import { TasksService } from 'src/app/service/Tasks/tasks.service';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-time-sheet-approval',
  templateUrl: './time-sheet-approval.component.html',
  styleUrls: ['./time-sheet-approval.component.css']
})


export class TimeSheetApprovalComponent implements OnInit{
  
  
  constructor(
    private _taskAssignmentService:TaskAssignmentService,
    private _timesheetService:TimeSheetService,
    private _mainService:ServiceService,
    private _ngbModal : NgbModal,
    private _taskService:TasksService,
    private _roleService:RoleService,
    private _timeSheetApprovalService:TimeSheetApprovalService,
    private _invoiceService:InvoiceService,
    private _accountService:AccountService
    ){}
    
    loading = false
    TimeMasterData :any =[]
    timeSheetStatusMain= ["","Pending","InProgress","Completed","Approved","Rejected"]
    userList : { [key: string]: string } = {};
    categoryList : { [key: string]: string } = {};
    singleTimeSheetMaster:any=[]
    invoiceDate = new Date()
    taskList : { [key: string]: string } = {};
    checkInvoice :{ [key: string]: boolean|number }= {};
    taskAssingmentList : { [key: string]: string } = {};
  
    ngOnInit(): void {
    this.GetAllTimeSheetMaster()
    this.GetAllUsers()
    this.GetAllTasks()
    this.GetTaskAssignemntsList()
  }
    
  GetAllTimeSheetMaster(){
    this._timesheetService.getAllTimeSheet().subscribe((response:any)=>{
      console.log(response);
      if(response.statusCode==200){
        this.TimeMasterData=response.response
        this.TimeMasterData = this.TimeMasterData.reverse()
        for (let i= 0; i < response.response.length; i++) {
          var timesheetid :number= response.response[i].id
          var torF = this.CheckInvoice(timesheetid)
        }
      }
      console.log(this.checkInvoice);
    }) 
  }

  GetTaskAssignemntsList(){
    this._taskAssignmentService.getAllTaskAssignment().subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode == 200){
        for (let i :any= 0; i < response.response.length; i++) {
          if(response.response[i].taskStatus=="3" )
          {
            this.taskAssingmentList[response.response[i].id]=response.response[i].taskId;   
            //console.log(this.taskAssingmentList);
          }
        }
      }
    })
  }

  GetAllTasks(){
    this._taskService.getAllTasks().subscribe((data:any)=>{
      //console.log(data);
      if(data.statusCode==200){
        for (let i :any= 0; i < data.response.length; i++) {
          this.taskList[data.response[i].id]=data.response[i].taskName;
        }
      }
    })
  }


  //getAllUsers
  GetAllUsers(){
    this._accountService.GetAllUser().subscribe((data:any)=>{
      if(data.statusCode==200){
        for (let i :any= 0; i < data.response.length; i++) {
          this.userList[data.response[i].id]=data.response[i].firstName+" "+data.response[i].lastName;
        }
        // console.log(this.userList)
      }
    })
  }


  EditTimeSheetMaster(data:any){
    data.lastModifiedBy = this._roleService.getUserId()
    data.lastModifiedOn = new Date()
    this._timesheetService.updateTimeSheet(data).subscribe((response:any)=>{
      if(response.statusCode==200){
        this._mainService.Toast.fire({icon:"success",title:"TimeSheet Updated Successfully"})
        this.GetAllTimeSheetMaster()
      }
      else{
        this._mainService.Toast.fire({icon:"error",title:response.message})
      }
    })
  }


  DeleteTimeSheetMaster(id:any){
    this._timesheetService.deleteTimeSheet(id).subscribe((response:any)=>{
      if(response.statusCode==200){
        this._mainService.Toast.fire({icon:"success",title:"TimeSheet Deleted Successfully"})
        this.GetAllTimeSheetMaster();
      }
      else{
        this._mainService.Toast.fire({icon:"error",title:response.message})
      }
    })
  }

  //approve TimeSheet 
  ApproveTimeSheet(data:any){
    data.timeSheetStatus=4
    const createTimeSheetApproval :ITimeSheetApproval ={
      id:0,
      timeSheetMasterId:data.id,
      approvalStatus:data.timeSheetStatus,
      approvalStatusBy:this._roleService.getUserId(),
      createdBy:this._roleService.getUserId(),
      createdOn:new Date(),
      lastModifiedBy:this._roleService.getUserId(),
      lastModifiedOn:new Date()
    } 
    
    this._timeSheetApprovalService.AddTimeSheetApproval(createTimeSheetApproval).subscribe((response:any)=>{
      if(response.statusCode==200)
      {
        this.EditTimeSheetMaster(data);
      }
      else{
      console.log(response);
      }
    })
  }
  
  //Check invoice
  CheckInvoice(timeSheetId:number):any{
   //let val = false;
    this._invoiceService.GetInvoiceByTimeSheetId(timeSheetId).subscribe((response:any)=>{
      if(response.isSuccess)
      {
        this.checkInvoice[timeSheetId] = response.response.id
      }else{
        this.checkInvoice[timeSheetId] = response.isSuccess
      }
      //val = response.isSuccess
    })
    // console.log(val);
    // return val;
  }

  //Modal open method for html 
  open(content: any,id:any) {
    this._timesheetService.getTimeSheetById(id).subscribe((response:any)=>{
      if(response.statusCode==200){
        //console.log(response.response);
        this.singleTimeSheetMaster=response.response
      }
    })
    this.invoiceDate=new Date()
    this._ngbModal.open(content);
  }

}
