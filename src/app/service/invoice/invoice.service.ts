import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private tokenService:TokenService,
    private http:HttpClient,
    private mainService:ServiceService
  ) { }

  AddInvoice(data:any){
    var headers= new HttpHeaders({"Authorization" : "Bearer "+this.tokenService.getToken()})
    return this.http.post(`${this.mainService.baseUrl}api/Invoice/AddInvoice`,data,{headers,responseType:'json'})
  }

  GetInvoiceByTimeSheetId(id:any){
    var headers= new HttpHeaders({"Authorization" : "Bearer "+this.tokenService.getToken()})
   return this.http.get(`${this.mainService.baseUrl}api/Invoice/GetInvoiceByTimeSheetId?timeSheetId=${id}`,{headers,responseType:'json'})
  }
  
  GetInvoiceById(id:any){
    var headers = new HttpHeaders({"Authorization":"Bearer "+this.tokenService.getToken()})
    return this.http.get(`${this.mainService.baseUrl}api/Invoice/GetInvoice?id=${id}`,{headers,responseType:'json'})
  }
}
