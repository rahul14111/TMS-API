import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskAssignmentService } from 'src/app/service/TaskAssignment/task-assignment.service';
import { TasksService } from 'src/app/service/Tasks/tasks.service';
import { AccountService } from 'src/app/service/account.service';
import { ProjectService } from 'src/app/service/Project/project.service';
import { RoleService } from 'src/app/service/role.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-task-assignment',
  templateUrl: './task-assignment.component.html',
  styleUrls: ['./task-assignment.component.css']
})
export class TaskAssignmentComponent implements OnInit {

  constructor(
    private _mainService:ServiceService,
    private _roleService: RoleService,
    private _ngbModal:NgbModal,
    private _taskService:TasksService,
    private _taskAssignmentService:TaskAssignmentService,
    private _projectService:ProjectService,
    private _accountService:AccountService
  ){}
  
  taskAssignments :any =[]
  projectList : { [key: string]: string } = {};
  taskList : { [key: string]: string } = {};
  userList : { [key: string]: string } = {};
  timeSheetStatus= ["","Pending","InProgress","Completed","Approved","Rejected"]
  SingleTaskAssignment:any=[]
  loading = false;
  taskHour :{ [key: string]: string } = {};

  ngOnInit(): void {
    this.getAllProjects()
    this.getAllTasks()
    this.getAllAssignedTask()
    this.getAllUsers()
  }

  //getAllUser()
  getAllUsers(){
    this._accountService.GetAllUser().subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode == 200){
        for (let i :any= 0; i < response.response.length; i++) {
          this.userList[response.response[i].id]=response.response[i].firstName +" "+ response.response[i].lastName;   
        }
        // console.log(this.developerList);
      }
    })
  }

  //getAllProject()
  getAllProjects(){
    this._projectService.getAllProject().subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode == 200){
        for (let i :any= 0; i < response.response.length; i++) {
          this.projectList[response.response[i].id]=response.response[i].projectName;   
        }
        // console.log(this.projectList);
      }
    })
  }
  
  //getAllTask()
  getAllTasks(){
    this._taskService.getAllTasks().subscribe((data:any)=>{
      //console.log(data);
      if(data.statusCode==200){
        for (let i :any= 0; i < data.response.length; i++) {
          this.taskList[data.response[i].id]=data.response[i].taskName;
          this.taskHour[data.response[i].id]=data.response[i].estimatedHours;
        }
        // console.log(this.taskList)
      }
    })
  }

  //get all task assigned 
  getAllAssignedTask(){
    this._taskAssignmentService.getAllTaskAssignment().subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode==200){
        this.taskAssignments=response.response
        this.taskAssignments = this.taskAssignments.reverse()
      }
    })
  }
  
  //request to create new Task assignment service
  SubmitAssignTask(data:any){
    this.loading  =true;
    console.log(this.loading);
    
    data.createdOn = new Date()
    data.taskStatus= 1
    data.createdBy = this._roleService.getUserId();
    this._taskAssignmentService.addTaskAssignment(data).subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode==200){
        this._mainService.Toast.fire({icon: 'success',title: 'Tasks Assigned To Developer successfully'})
        this.getAllAssignedTask()
        this.loading  =false;
      }
    })
    console.log(this.loading);
    //console.log(data)
  }

  //request to update new Task assignment service
  EditTaskAssignment(data:any){
      this._taskAssignmentService.updateTaskAssignment(data).subscribe((response:any)=>{
        //console.log(response);
        if(response.statusCode=200){
          this._mainService.Toast.fire({icon:"success",title:"Data Edited Successfully"})
        }
        this.getAllAssignedTask()
      }) 
  }

  //request to update new Task assignment service
  DeleteSingleTaskAssignment(id:any){
      this._taskAssignmentService.deleteTaskAssignment(id).subscribe((response:any)=>{
        //console.log(response);
        if(response.statusCode=200){
          this._mainService.Toast.fire({icon:"success",title:"Data Deleted Successfully"})
        }else{
          this._mainService.Toast.fire({icon:"error",title:"Something Went Wrong"})
        }
        this.getAllAssignedTask()
      }) 
  }

  
  //modal html open method 
  open(data:any,id:any){
    this._ngbModal.open(data);
    this._taskAssignmentService.getTaskAssignmentById(id).subscribe((response:any)=>{
      if(response.statusCode==200){
        //console.log(response.response);
        this.SingleTaskAssignment = response.response
      }
    })
  }
}
