import { Component,  OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ProjectService } from 'src/app/service/Project/project.service';
import { RoleService } from 'src/app/service/role.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent implements OnInit {
  projectForm!: FormGroup<any>;
  project: any;
  fileInput : any;
  imageFile! : any ;

  constructor(
    private projectService: ProjectService,private roleService : RoleService,private _mainService:ServiceService) {}
  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      imageFile : new FormControl('', Validators.required)
    });
   
  }
  //Create Project
  createProject(data: any) {
    
    this.projectService.createProject(data).subscribe((result: any) => {
      console.log(result);
      if(result.statusCode === 200) {
        this._mainService.Toast.fire({icon: 'success',title: 'Project add in successfully'});
        
      }
      else{
        this._mainService.Toast.fire({icon: 'error',title: 'Project not added in successfully'});

      }
        this.fileUpload(result.response);
        this.projectForm.reset();
    });

  }

//on change 
  onFileChanged(event: any) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      this.projectForm.patchValue({
        ImageFile: file,
      });
      this.imageFile = file;
    }

  }  

//fileupload
fileUpload(projectId: any) {
console.log(this.imageFile);
  if (this.imageFile) {
    let currentDate = new Date().toJSON().slice(0, 10);
    let userId = this.roleService.getUserId();
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('DocumentName', this.imageFile.name);
    if (userId !== null && userId !== undefined) {
    formData.append('createdBy',userId);
    formData.append('lastModifiedBy',userId);
    }
    formData.append('createdOn', currentDate);
    
    formData.append('modifiedOn', currentDate);
    formData.append('file', this.imageFile);

console.log(formData);

    this.projectService.uploadFile(formData).subscribe((response: any)=>{
      console.log(response);
  });
  }

}

}
