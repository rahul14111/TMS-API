import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private tokenService:TokenService ,
    private mainService:ServiceService,
    private http: HttpClient) { }

  getAllTasks(){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this.tokenService.getToken()})
    return this.http.get(`${this.mainService.baseUrl}api/TimeSheet/GetTasks`,{headers,responseType:'json'});
  }

  addTasks(data:any){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this.tokenService.getToken()})
    return this.http.post(`${this.mainService.baseUrl}api/TimeSheet/createTasks`,data,{headers,responseType:'json'});
  }

  getTasksById(id:number){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this.tokenService.getToken()})
    return this.http.get(`${this.mainService.baseUrl}api/TimeSheet/GetTask?id=${id}`,{headers,responseType:'json'});
  }

  updateTask(data:any){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this.tokenService.getToken()})
    return this.http.put(`${this.mainService.baseUrl}api/TimeSheet/UpdateTask`,data,{headers,responseType:'json'});
  }

  deleteTask(id:number){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this.tokenService.getToken()})
    return this.http.delete(`${this.mainService.baseUrl}api/TimeSheet/DeleteTask?id=${id}`,{headers,responseType:'json'});
  }

  

}
