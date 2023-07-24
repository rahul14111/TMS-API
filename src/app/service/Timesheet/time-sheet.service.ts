import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  constructor(
    private mainService: ServiceService,
    private http: HttpClient,
    private tokenService:TokenService) { }

  //create Timesheet
  createTimeSheet(data:any) {
    console.log("from Timesheet service"+data)
    let headers = new HttpHeaders({"Authorization":'Bearer '+this.tokenService.getToken()})
    return this.http.post(this.mainService.baseUrl+'api/TimeSheet/AddTimeSheet',data,{headers,responseType:'json'});
  }

  getAllTimeSheet(){
    let headers = new HttpHeaders({"Authorization":'Bearer '+this.tokenService.getToken()})
    return this.http.get(this.mainService.baseUrl+'api/TimeSheet/GetTimesheetMastersList',{headers,responseType:'json'});
  }

  getTimeSheetById(id:number){
    let headers = new HttpHeaders({"Authorization":'Bearer '+this.tokenService.getToken()})
    return this.http.get(`${this.mainService.baseUrl}api/TimeSheet/GetTimesheetMaster?id=${id}`,{headers,responseType:'json'})
  }

  getTimeSheetByUserId(id:any){
    let headers = new HttpHeaders({"Authorization":'Bearer '+this.tokenService.getToken()})
    return this.http.get(this.mainService.baseUrl+'api/TimeSheet/GetTimesheetMasterByUserId?userId='+id,{headers,responseType:'json'})
  }

  updateTimeSheet(data:any){
    let headers = new HttpHeaders({"Authorization":'Bearer '+this.tokenService.getToken()})
    return this.http.put(this.mainService.baseUrl+'api/TimeSheet/UpdateTimesheetMaster',data,{headers,responseType:'json'})
  }

  deleteTimeSheet(id:any){
    let headers = new HttpHeaders({"Authorization":'Bearer '+this.tokenService.getToken()})
    return this.http.delete(this.mainService.baseUrl+'api/TimeSheet/DeleteTimesheetMaster?id='+id,{headers,responseType:'json'})
  }

}