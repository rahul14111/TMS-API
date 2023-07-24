import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetApprovalService {

  constructor(
    private http:HttpClient,
    private mainService:ServiceService,
    private tokenService:TokenService) { }
  
  GetTimeSheetApproval(id:number){
    var headers= new HttpHeaders({'Authorization':'Bearer '+this.tokenService.getToken()})
    return this.http.get(this.mainService.baseUrl+'api/TimeSheet/GetTimeSheetApproval?id='+id,{headers:headers})
  }
  
  GetAllTimeSheetApproval(){
    var headers= new HttpHeaders({'Authorization':'Bearer '+this.tokenService.getToken()})
    return this.http.get(this.mainService.baseUrl+'api/TimeSheet/GetTimesheetApprovals',{headers:headers})
  }

  GetTimeSheetApprovalByTimeSheetId(id:number){
    var headers= new HttpHeaders({'Authorization':'Bearer '+this.tokenService.getToken()})
    return this.http.get(this.mainService.baseUrl+'api/TimeSheet/GetTimeApprovalByTimeSheetId?timesheetMasterId='+id,{headers,responseType:'json'})
  }

  AddTimeSheetApproval(data:any){
    var headers= new HttpHeaders({'Authorization':'Bearer '+this.tokenService.getToken()})
    return this.http.post(this.mainService.baseUrl+'api/TimeSheet/AddTimesheetApproval',data,{headers,responseType:'json'})
  }

  UpdateTimeSheetApproval(data:any){
    var headers= new HttpHeaders({'Authorization':'Bearer '+this.tokenService.getToken()})
    return this.http.put(this.mainService.baseUrl+'api/TimeSheet/UpdateTimesheetApproval',data,{headers,responseType:'json'})
  }

  DeleteTimeSheetApproval(id:number){
    var headers= new HttpHeaders({'Authorization':'Bearer '+this.tokenService.getToken()})
    return this.http.delete(this.mainService.baseUrl+'api/TimeSheet/DeleteTimesheetApproval?id='+id,{headers,responseType:'json'})
  }

  
}
