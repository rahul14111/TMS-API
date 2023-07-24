import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/service/Tasks/tasks.service';

import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(
    private _tasksService : TasksService,
    private ngbModal:NgbModal,
    private mainService:ServiceService
  ) {}
  
  loading = false
  TaskData :any =[]
  SingleTaskData :any=[]
  itemId:number=0
  
  ngOnInit(): void {
    this.GetAllTasks()
  }

  //send Request To Service
  SendAddTaskData(data:any){
    //console.log(data);
    this._tasksService.addTasks(data).subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode==200){
        this.mainService.Toast.fire({icon: 'success',title: 'Tasks Added successfully'})
        this.GetAllTasks()
      }
    },(error:any)=>{ this.mainService.Toast.fire({icon: 'error',title: 'Enter Valid Data'})
    });
  }

  //send Request To Service
  GetAllTasks(){
    this._tasksService.getAllTasks().subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode==200){
        this.TaskData=response.response
        this.TaskData = this.TaskData.reverse()
      }
    }) 
  }

  //send Request To Service
  SendEditTaskData(data :any){
    //console.log(data);
    this._tasksService.updateTask(data).subscribe((response:any)=>{
     if(response.statusCode==200)
     {
      this.mainService.Toast.fire({icon: 'success',title: 'Tasks Updated Successfully'})
      this.GetAllTasks()
     } 
    })
  }

  //send Request To Service
  SendDeleteTaskData(id:any){
    this._tasksService.deleteTask(id).subscribe((response:any)=>{
      //console.log(response)
      if(response.statusCode==200){
        this.mainService.Toast.fire({icon: 'success',title: 'Tasks Deleted Successfully'})
        this.GetAllTasks()
      }else{
        this.mainService.Toast.fire({icon: 'error',title: response.message})
      }
    })
  }

  //Modal open method for html 
  open(content: any,id:any) {
    this.itemId = id;
    this.ngbModal.open(content);
    this._tasksService.getTasksById(id).subscribe((response:any)=>{
      //console.log(response)
      this.SingleTaskData=response
    })
  }
}
