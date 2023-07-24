import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators,FormArray  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskAssignmentService } from 'src/app/service/TaskAssignment/task-assignment.service';
import { TasksService } from 'src/app/service/Tasks/tasks.service';
import { TimeSheetService } from 'src/app/service/Timesheet/time-sheet.service';
import { AccountService } from 'src/app/service/account.service';
import { RoleService } from 'src/app/service/role.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-time-sheet-create',
  templateUrl: './time-sheet-create.component.html',
  styleUrls: ['./time-sheet-create.component.css']
})
export class TimeSheetCreateComponent implements OnInit  {
  constructor(
    private _formBuilder: FormBuilder,
    private _mainService:ServiceService,
    private _taskAssignmentService: TaskAssignmentService,
    private _roleService:RoleService,
    private _ngbModal:NgbModal,
    private _taskService:TasksService,
    private _timeSheetService:TimeSheetService,
    private _accountService:AccountService
  ){}

  
  TimeMasterData:any=''

  //taskAssignmentId => taskName
  taskAssingmentList : { [key: string]: string } = {};
  userList : { [key: string]: string } = {};
  timeSheetStatus= ["","Pending","InProgress","Completed"]
  timeSheetStatusMain= ["","Pending","InProgress","Completed","Approved","Rejected"]
  taskList : { [key: string]: string } = {};
  taskAssingmentId: string[] = [];
  singleTimeSheetMaster:any=[]
  hourBilled: { [key: string]: string } = {};

  ngOnInit(): void {
    this.GetTaskAssignemntsList()
    this.GetAllTasks()
    this.GetAllTimeSheets()
    this.GetAllUsers()
  }

  timeSheetForm = new FormGroup({    
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    totalHours: new FormControl(0, Validators.required),
    TimeSheetStatus: new FormControl(''),
    comments:  new FormControl(''),
    CreatedOn: new FormControl(new Date()),
    CreatedBy: new FormControl(this._roleService.getUserId()),
    TimeSheetDetails: this._formBuilder.array([])
  });

  GetAllTimeSheets(){
    this._timeSheetService.getAllTimeSheet().subscribe((response:any)=>{
      console.log(response);
      if(response.statusCode=200){
        this.TimeMasterData=response.response;
        this.TimeMasterData= this.TimeMasterData.reverse()
      }
    })
  }


  GetTaskAssignemntsList(){
    this._taskAssignmentService.getAllTaskAssignment().subscribe((response:any)=>{
      console.log(response);
      if(response.statusCode == 200){
        for (let i :any= 0; i < response.response.length; i++) {
          if(response.response[i].employeeId==this._roleService.getUserId() && response.response[i].taskStatus=="3" )
          {
            this.taskAssingmentList[response.response[i].id]=response.response[i].taskId;   
          }
        }
        console.log(this.taskAssingmentList);
      }
    })
  }

  //getAllTask()
  GetAllTasks(){
    this._taskService.getAllTasks().subscribe((data:any)=>{
      //console.log(data);
      if(data.statusCode==200){
        for (let i :any= 0; i < data.response.length; i++) {
          this.taskList[data.response[i].id]=data.response[i].taskName;
          this.hourBilled[data.response[i].id] = data.response[i].estimatedHours
          ;
        }
         //console.log(this.taskList)
      }
    })
  }

  //getAllUsers
  GetAllUsers(){
    this._accountService.GetAllUser().subscribe((data:any)=>{
      console.log(data);
      if(data.statusCode==200){
        for (let i :any= 0; i < data.response.length; i++) {
          this.userList[data.response[i].id]=data.response[i].firstName+" "+data.response[i].lastName;
        }
        // console.log(this.userList)
      }
    })
  }
  
  //#region timesheetDetailsLogic
  get timeSheetDetails(): FormArray {
    return this.timeSheetForm.get('TimeSheetDetails') as FormArray;
  }

  addTimeSheetDetail() {
    const timeSheetDetail = new FormGroup({
      TaskAssignmentId: new FormControl(''),
      Period: new FormControl(''),
      Hours: new FormControl('')
    });
    this.timeSheetDetails.push(timeSheetDetail);
  }
  
  removeTimeSheetDetail(index: number) {
    this.timeSheetDetails.removeAt(index);
  }
  //#endregion

  Gethours(indexNo: any) {
    const formArrayValues: any = this.timeSheetForm.controls.TimeSheetDetails.value;
    this.taskAssingmentId[indexNo] = formArrayValues[indexNo].TaskAssignmentId //taskassignmentId 
  }

  onSubmit(data:any) {
    //console.log(data.TimeSheetDetails)
    if(data.TimeSheetDetails.length!=0){
      
      data.TimeSheetDetails.forEach((element)=>{
        data.totalHours =  data.totalHours + parseInt(element.Hours)
      })
      
      this._timeSheetService.createTimeSheet(data).subscribe((response:any)=>{
        if(response.statusCode==200)
        {
          this._mainService.Toast.fire({icon: 'success',title: "Time-Sheet Created Successfully"})
          this.timeSheetForm.reset();
          this.GetAllTimeSheets()
        }
      },(error:any)=>{
        this._mainService.Toast.fire({icon: 'error',title: "Time-Sheet Creation Failed"})
      })
    }else{
      this._mainService.Toast.fire({icon: 'error',title: "Add Time-Sheet Details"})
    }
  }

  EditTimeSheetMaster(data:any){
    data.lastModifiedBy=this._roleService.getUserId();
    data.lastModifiedOn= new Date()
   
    this._timeSheetService.updateTimeSheet(data).subscribe((response:any)=>{
      console.log(response)
      if(response.statusCode==200){
        this._mainService.Toast.fire({icon: 'success',title: "Time-Sheet Updated Successfully"})
        this.GetAllTimeSheets()
      }
    })
  }

  //Delete TimeSheetMaster 
  DeleteTimeSheetMaster(id:number){
    this._timeSheetService.deleteTimeSheet(id).subscribe((response:any)=>{
      console.log(response);
      if(response.statusCode=200){
        this._mainService.Toast.fire({icon: 'success',title: "Time-Sheet Deleted Successfully"})
        this.GetAllTimeSheets()
      }
    })
  }
    
  //Modal open method for html 
  open(content: any,id:any) {
    this._timeSheetService.getTimeSheetById(id).subscribe((response:any)=>{
      if(response.statusCode==200){
        console.log(response.response);
        this.singleTimeSheetMaster=response.response
      }
    })
    this._ngbModal.open(content);
  }
}
