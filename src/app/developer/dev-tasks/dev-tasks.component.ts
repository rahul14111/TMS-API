import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskAssignmentService } from 'src/app/service/TaskAssignment/task-assignment.service';
import { TasksService } from 'src/app/service/Tasks/tasks.service';
import { AccountService } from 'src/app/service/account.service';
import { ProjectService } from 'src/app/service/Project/project.service';
import { RoleService } from 'src/app/service/role.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-dev-tasks',
  templateUrl: './dev-tasks.component.html',
  styleUrls: ['./dev-tasks.component.css']
})

export class DevTasksComponent {
  constructor(
    private _taskAssignmentService:TaskAssignmentService,
    private _taskService: TasksService,
    private _ngbModal:NgbModal,
    private _mainService:ServiceService,
    private _roleService:RoleService,
    private _projectService:ProjectService,
    private _accountService:AccountService
  ){}

  mytaskList:any =[]
  projectList : { [key: string]: string } = {};
  taskList : { [key: string]: string } = {};
  userList : { [key: string]: string } = {};
  timeSheetStatus= ["","Pending","InProgress","Completed"];
  SingleTaskAssignment:any =[];
  myUserId :any = '';
  taskHour :{ [key: string]: string } = {};

  ngOnInit(): void {
    this.myUserId = this._roleService.getUserId()
    this.getMyTaskAssingmentList(this.myUserId)
    this.getAllUsers()
    this.getAllProjects()
    this.getAllTasks()
  }

  getMyTaskAssingmentList(userId:any){
    this._taskAssignmentService.getMyTasksAssigned(userId).subscribe((response:any)=>{
      //console.log(response);
      this.mytaskList = response.response;
      this.mytaskList = this.mytaskList.reverse()
    })
  }

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
     // console.log(data);
      if(data.statusCode==200){
        for (let i :any= 0; i < data.response.length; i++) {
          this.taskList[data.response[i].id]=data.response[i].taskName;
          this.taskHour[data.response[i].id]=data.response[i].estimatedHours;
        }
        // console.log(this.taskList)
      }
    })
  }

  //Send Edit request to service
  EditTaskAssignment(data:any){
    //console.log(data)
    this._taskAssignmentService.updateTaskAssignment(data).subscribe((response:any)=>{
      console.log(response);
      if(response.statusCode==200){
        this._mainService.Toast.fire({icon:"success",title: 'Tasks Status changed successfully'})
        // this.ngbModal.dismissAll();
        this.myUserId = this._roleService.getUserId();
        this.getMyTaskAssingmentList(this.myUserId)
        
      }
    })
  }

  //modal html open method 
  open(data:any,id:any){
    //console.log(id)
    this._ngbModal.open(data);
    this._taskAssignmentService.getTaskAssignmentById(id).subscribe((response:any)=>{
      if(response.statusCode==200){
        //console.log(response.response);
        this.SingleTaskAssignment = response.response
      }
    })
  }
}
