import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import * as html2pdf from 'html2pdf.js';
import { TaskAssignmentService } from 'src/app/service/TaskAssignment/task-assignment.service';
import { TimeSheetApprovalService } from 'src/app/service/TimeSheetApproval/time-sheet-approval.service';
import { TimeSheetService } from 'src/app/service/Timesheet/time-sheet.service';
import { CategoryService } from 'src/app/service/Category/category.service';
import { TasksService } from 'src/app/service/Tasks/tasks.service';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {
  constructor(
    private _invoiceService : InvoiceService,
    private _timeSheetService: TimeSheetService,
    private _categoryService:CategoryService,
    private _taskService:TasksService,
    private _taskAssignmentService:TaskAssignmentService,
    private _accountService:AccountService
  ){}

  ngOnInit(): void {
    this.GetInvoice(this.invoiceId)
    this.GetAllTasks()
    this.GetAllUsers()
  }

  invoiceId = location.pathname.split('/').pop();
  category =null;
  invoiceDate=null;
  taskList: { [key: string]: string } = {};
  taskAssingmentList: {[key:string]:string} ={}
  taskCreatedBy:{[key:string]:string}={}
  userList: {[key:string]:string}={}

  invoiceDetails :any = []
  timeSheetMasterId=''
  totalAmount=''

  convertToPdf() {
    const options = {
      padding:     10,
      filename:     'Invoice_#'+this.invoiceId+'.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const element = document.getElementById('InvoiceView');
    html2pdf().from(element).set(options).save();
  }

  GetInvoice(id:any){
    this._invoiceService.GetInvoiceById(id).subscribe((response:any)=>{
      //console.log(response)
      if(response.statusCode==200){
        this.invoiceDetails = response.response.invoiceDetails
        this.category = response.response.categoryId
        this.invoiceDate = response.response.invoiceDate
        this.timeSheetMasterId = response.response.timeSheetMasterId
        this.totalAmount = response.response.totalAmount
        this.GetTimeSheetMasterById(response.response.timeSheetMasterId)
        this.GetCategoryById(response.response.categoryId)
        
        for (let index = 0; index < this.invoiceDetails.length; index++) {          
          this.GetTaskAssignemntsList(this.invoiceDetails[index].taskAssignmentId)
        }
      }
    })
  }

  GetTimeSheetMasterById(id:any){
    this._timeSheetService.getTimeSheetById(id).subscribe((response:any)=>{
      //console.log(response)
      if(response.statusCode==200){
        this.timeSheetMasterId = response.response.id
      }
    })
  }

  GetCategoryById(id:any){
    this._categoryService.GetCategoryById(id).subscribe((response:any)=>{
      //console.log(response)
      if(response.statusCode==200){
        this.category = response.response.categoryName
      }
    })
  }

  
  GetTaskAssignemntsList(id:any){
    this._taskAssignmentService.getTaskAssignmentById(id).subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode == 200){
        console.log(response);
        this.taskAssingmentList[response.response.id]=response.response.taskId;
        this.taskCreatedBy[response.response.id] = response.response.createdBy
      }
    })
  }

  //getAllTask()
  GetAllTasks(){
    this._taskService.getAllTasks().subscribe((data:any)=>{
      //console.log(data);
      if(data.statusCode==200){
        for (let i :any= 0; i < data.response.length; i++) {
          this.taskList[data.response[i].id]=data.response[i].taskName;
        }
         //console.log(this.taskList)
      }
      console.log(this.taskAssingmentList)

    })
  }

  GetAllUsers(){
    this._accountService.GetAllUser().subscribe((response:any)=>{
      //console.log(response);
      if(response.statusCode == 200){
        for (let i :any= 0; i < response.response.length; i++) {
          this.userList[response.response[i].id]=response.response[i].firstName +" "+ response.response[i].lastName;   
        }
        // console.log(this.developerList);
      }
    })
  }

}
