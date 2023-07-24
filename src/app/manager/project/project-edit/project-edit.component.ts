import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/service/Project/project.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent {
  projectdata : any;
  projectForm = new FormGroup({
    Id : new FormControl(''),
    projectName: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  });
  projectsId: any = location.pathname.split('/').pop();
 
  constructor(private projectService: ProjectService,private _mainService:ServiceService) { }

  ngOnInit() {
    this.getProjectById(this.projectsId);
  }
  editProject(project: any) {
    this.projectService.updateProject(project).subscribe((response : any)=>{
      console.log(response);
      if(response.statusCode === 200) {
        this._mainService.Toast.fire({icon: 'success',title: 'Project Edit  successfully'}); 
      }
      else{
        this._mainService.Toast.fire({icon: 'error',title: 'Project not edited  successfully'});
      }
      this.projectForm.reset();
    });
  }

  getProjectById(id: any) {
    this.projectService.getProjectId(id).subscribe((response: any) => {
      this.projectdata = response.response;
    })
  }

}
