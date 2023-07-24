import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { TokenService } from '../token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskAssignmentService {

  constructor(
    private tokenService:TokenService ,
    private mainService:ServiceService,
    private http: HttpClient) { }
    
    getTaskAssignmentById(id:any){
      var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
      return  this.http.get(`${this.mainService.baseUrl}api/TimeSheet/GetTaskAssignment?id=${id}`,{headers,responseType:"json"});
    }

    getAllTaskAssignment(){
      var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
      return  this.http.get(`${this.mainService.baseUrl}api/TimeSheet/GetTaskAssignments`,{headers,responseType:"json"});
    }

    addTaskAssignment(data:any){
      var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
      return  this.http.post(`${this.mainService.baseUrl}api/TimeSheet/AddTaskAssignment`,data,{headers,responseType:"json"});
    }

    updateTaskAssignment(data:any){
      var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
      return  this.http.put(`${this.mainService.baseUrl}api/TimeSheet/UpdateTaskAssignment`,data,{headers,responseType:"json"});
    }

    deleteTaskAssignment(id:any){
      var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
      return  this.http.delete(`${this.mainService.baseUrl}api/TimeSheet/DeleteTaskAssignment?id=${id}`,{headers,responseType:"json"});
    }

    getMyTasksAssigned(userId:any){
      var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
      return this.http.get(`${this.mainService.baseUrl}api/TimeSheet/TaskAssignmentByUserId?userId=${userId}`,{headers,responseType:'json'});
    }
    
}
