import { Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { ServiceService } from './service.service';
import { TokenService } from './token.service';
const  USER_ID = 'userId';
const USER_NAME = 'userName';

@Injectable({
  providedIn: 'root'
})
export class AccountService  {
 constructor(private http:HttpClient,
  private mainService:ServiceService,
  private _tokenService: TokenService
) { }
 
 baseUrl= this.mainService.baseUrl;
//Get GetUserID From LocalStorage
  getUserId(){
    return localStorage.getItem(USER_ID);
  }
//Get GetUserName From LocalStorage
  getUserName(){
    return localStorage.getItem(USER_NAME);
  }
  //Clear UserID to LocalStorage
  clearId(){
    return localStorage.removeItem(USER_ID);
  }
  //Clear UserName to LocalStorage
  clearName(){
    return localStorage.removeItem(USER_NAME);
  }

//Add UserID Into Local Storage 
  addUserId(userId: string) {
    return localStorage.setItem(USER_ID, userId);
  }
//Add UserName Into Local Storage 
  addUserName(userName: string) {
    return localStorage.setItem(USER_NAME, userName);
  }

  GetAllUser()  {
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    return this.http.get(this.baseUrl+'api/Account/GetAllUser',{headers});
  }
 
  GetAllManagers()  {
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    return this.http.get(this.baseUrl+'api/Account/GetAllManagers',{headers});
  }
  
  UpdateUserStatus(userId: any){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    return this.http.put(this.baseUrl+'api/Account/UpdateUserStatus?id='+userId,"",{headers});
  }

  UserInfo(userId: any){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    return this.http.get(this.baseUrl+'api/Account/GetUserLoginInformation?userId=' + userId,{headers});
  }

  CreateAccount(data:any){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    return this.http.post(this.baseUrl+'api/Account/Registration',data,{headers});
  }
  
  UpdateProfile(data:any){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    console.log(data);
    return this.http.put(this.baseUrl+'api/Account/UpdateUser',data,{headers});
  }

  ChangePassword(data:any){
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this._tokenService.getToken()})
    return this.http.post(this.baseUrl+'api/Account/ChangePassword',data,{headers});
  }

  ForgetPassword(email: any){
    console.log(email)
    return this.http.post(this.baseUrl+'api/Account/ForgetPassword?Email='+email,'');
  }

  ResetPassword(data: any){
    return this.http.post(this.baseUrl+'api/Account/ResetPassword',data);
  }

  Login(data:any) {
    return this.http.post(this.baseUrl +'api/Account/SignIn',data);
  }

  LogOut(){
    var headers = new HttpHeaders({"Authorization": "Bearer "+ this._tokenService.getToken()})
    return this.http.get(this.baseUrl +'api/Account/SignOut',{headers,responseType: 'json'});
  }
  
}