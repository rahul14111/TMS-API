import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/Project/project.service';
import { RoleService } from 'src/app/service/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/service/account.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})


export class ProjectListComponent implements OnInit {
  projects: any = [];
  project: any = { project_name: ""};
  projectDetails: any = [];
  role:string|null="";
  userList : { [key: string]: string } = {};
  
  constructor(
    private projectService: ProjectService,
    private roleService: RoleService,
    private ngbModal:NgbModal,
    private _accountService:AccountService,
    private _mainService:ServiceService
  ) {}
  ngOnInit() {
    this.listProjects();
    this.role= this.roleService.getRole();
    this.GetAllUsers()
    //this.filterProjects();
  }
 // list of projects
  listProjects() {
    this.projectService.listProject().subscribe((response: any) => {
      console.log(response.response);
      this.projects = response.response;
      this.projects = this.projects.reverse()
    });
  }


GetAllUsers(){
  this._accountService.GetAllUser().subscribe((data:any)=>{
    if(data.statusCode==200){
      for (let i :any= 0; i < data.response.length; i++) {
        this.userList[data.response[i].id]=data.response[i].firstName+" "+data.response[i].lastName;
      }
      // console.log(this.userList)
    }
  })
}


listProjectDocuments(id : number) {
  
    this.projectService.getAllProjectDocuments(id).subscribe((response:any) =>{
      this.projectDetails = response.response
  });
}

  //modal html open method 
  open(data:any,id:any){
    this.ngbModal.open(data,{ size: 'lg' });
    this.projectService.getProjectId(id).subscribe((response:any)=>{
      if(response.statusCode==200){
        this.project = response.response
        this.listProjectDocuments(id); 

      }
    })
  }
  
  // EditProject
  SendEditProject(data : any){
    this.projectService.updateProject(data).subscribe((response : any) =>{
      if(response.statusCode === 200) {
        this._mainService.Toast.fire({icon: 'success',title: 'Project Updated in successfully'});
      }
      else{
        this._mainService.Toast.fire({icon: 'error',title: 'Project not Updated in successfully'});
      }
        this.listProjects();
    });
  }
  
//DeleteProject
  deleteProject(id:any){
      this.projectService.deleteProject(id).subscribe((response:any)=>{
        console.log(response);
        if(response.statusCode === 200) {
          this._mainService.Toast.fire({icon: 'success',title: 'Project deleted  successfully'});
          
        }
        else{
          this._mainService.Toast.fire({icon: 'error',title: 'Project not deleted  successfully'});
  
        }
        this.projectService.listProject();
      }) 
  }
  NavigateToFile(urlLink :any){
    window.open(urlLink, '_blank')
  }
}
