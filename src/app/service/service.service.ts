import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ServiceService  {
  constructor(private http:HttpClient) { }
  baseUrl = "https://localhost:7179/";
  loginResponse : any= [];


 //sweet Alert just refer this token and add this toast variable 
 Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
}