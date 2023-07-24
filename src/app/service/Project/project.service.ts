import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor( private http: HttpClient,private tokenService: TokenService, private mainservice: ServiceService) {}
  baseUrl = this.mainservice.baseUrl;
  id!: string;

  getAllProject(){
    var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
    return  this.http.get(`${this.baseUrl}api/Project/GetAllProjects`,{headers,responseType:"json"});
  }

  // CreateProjectService
  createProject(data: any) {
    var headers = new HttpHeaders({
      "Authorization": 'Bearer ' + this.tokenService.getToken(),
    });
   return this.http
      .post(this.baseUrl + 'api/Project/AddProject', data, { headers });
      
  }

  //  ListProjectService
  listProject() {
    var headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenService.getToken(),
    });
    return this.http.get(this.baseUrl + 'api/Project/GetAllProjects', {
      headers,
    });
  }

  // getallprojectdocuments
  getAllProjectDocuments(id:any){
    var headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenService.getToken(),
    });
    return this.http.get(this.baseUrl + 'api/Project/GetAllProjectDocuments?projectId='+id, {
      headers,
    });
  }

  // getprojectById
  getProjectId(id:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
    return  this.http.get(`${this.baseUrl}api/Project/GetProject?id=${id}`,{headers,responseType:"json"});
  }

  //updateProjectService
  updateProject(data:any){ 
    var headers = new HttpHeaders({"Authorization" : 'Bearer '+ this.tokenService.getToken()})
    return this.http.put(`${this.baseUrl}api/Project/UpdateProject`,data,{headers,responseType:'json'});
  }

  //DeleteProjectService
  deleteProject(id:any){
    var headers = new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()})
    return  this.http.delete(`${this.baseUrl}api/Project/DeleteProject?id=${id}`,{headers,responseType:"json"});
  }

  // uplodefileService
  uploadFile(data:FormData) {
   return  this.http.post(this.mainservice.baseUrl+ "api/Project/UploadProjectDocument",data, { headers : new HttpHeaders({'Authorization': 'Bearer '+this.tokenService.getToken()}).set("Accept", "multipart/form-data")}
      )
  }

  //getallProjectDocumentsService
  getAllProjectDocumnets() {
    this.http
      .post(this.baseUrl + 'api/Project/GetAllProjectDocuments', FormData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  checkProjectAssociation(projectId: any) {
    return this.http.get<any>(`/api/projects/${projectId}/association`);
  }
}
