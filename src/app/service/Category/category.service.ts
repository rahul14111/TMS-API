import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private mainService:ServiceService,
    private http:HttpClient,
    private tokenService:TokenService
  ) { }

  GetAllCategories(){
    var headers = new HttpHeaders({"authorization" : "Bearer "+this.tokenService.getToken()});
    return this.http.get(`${this.mainService.baseUrl}api/Category/GetAll`,{headers,responseType:'json'});
  }

  GetCategoryById(id:any){
    var headers = new HttpHeaders({"Authorization" : "Bearer "+this.tokenService.getToken()});
    return this.http.get(`${this.mainService.baseUrl}api/Category/${id}`,{headers,responseType:'json'});
  }

}
