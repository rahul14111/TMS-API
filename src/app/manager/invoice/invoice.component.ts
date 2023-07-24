import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  RequiredValidator,
  FormArray,
} from '@angular/forms';
import { CategoryService } from 'src/app/service/Category/category.service';
import { TaskAssignmentService } from 'src/app/service/TaskAssignment/task-assignment.service';
import { TasksService } from 'src/app/service/Tasks/tasks.service';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { ServiceService } from 'src/app/service/service.service';
import { Router } from '@angular/router';
import { TimeSheetService } from 'src/app/service/Timesheet/time-sheet.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _taskAssignmentService: TaskAssignmentService,
    private _taskService: TasksService,
    private _invoiceService: InvoiceService,
    private _mainService: ServiceService,
    private _router: Router,
    private _timesheetService: TimeSheetService
  ) {}

  categoryList: { [key: string]: string } = {};
  taskAssingmentList: { [key: string]: string } = {};
  taskList: { [key: string]: string } = {};
  timeSheetMasterId = location.pathname.split('/').pop();
  totalAmountCalc = 0;
  timeSheetMaster: any[] = [];
  timeSheetdetails: any = null;
  hourBilled: { [key: string]: string } = {};
  taskAssingmentId: string[] = [];

  ngOnInit(): void {
    this.GetAllCategory();
    this.GetAllTasks();
    this.GetTimeSheetMaster(this.timeSheetMasterId);
  }

  invoiceForm = new FormGroup({
    timeSheetMasterId: new FormControl(this.timeSheetMasterId),
    categoryId: new FormControl('', Validators.required),
    invoiceDate: new FormControl(new Date(), Validators.required),
    totalAmount: new FormControl(this.totalAmountCalc, Validators.required),
    invoiceDetailRequestDTO: this._formBuilder.array([]),
  });

  GetTimeSheetMaster(id: any) {
    console.log(id);

    this._timesheetService.getTimeSheetById(id).subscribe((response: any) => {
      console.log(response);
      this.timeSheetMaster = response.response;

      for (
        let index = 0;
        index < response.response.timeSheetDetails.length;
        index++
      ) {
        this.hourBilled[
          response.response.timeSheetDetails[index].taskAssignmentId
        ] = response.response.timeSheetDetails[index].hours;
        this.GetTaskAssignemntsList(
          response.response.timeSheetDetails[index].taskAssignmentId
        );
      }
      console.log(this.taskAssingmentList);
      console.log(this.hourBilled);
    });
  }

  OnSubmit(data: any) {
    this._invoiceService.AddInvoice(data).subscribe((response: any) => {
      //console.log(response);
      if (response.statusCode == 200) {
        this._mainService.Toast.fire({
          icon: 'success',
          title: 'Invoice Generated',
        });
        this._router.navigateByUrl('TimeSheetApproval');
      } else {
        this._mainService.Toast.fire({
          icon: 'error',
          title: response.statusMessage,
        });
      }
    });
    this.invoiceForm.reset();
  }

  //#region timesheetDetailsLogic
  get invoiceDetailRequestDTO(): FormArray {
    return this.invoiceForm.get('invoiceDetailRequestDTO') as FormArray;
  }

  addInvoiceDetail() {
    const invoiceDetailRequestSingle = new FormGroup({
      invoiceId: new FormControl(0),
      taskAssignmentId: new FormControl('', Validators.required),
      hoursBilled: new FormControl('', Validators.required),
      ratePerHour: new FormControl(0),
    });
    this.invoiceDetailRequestDTO.push(invoiceDetailRequestSingle);
  }

  removeInvoiceDetail(index: number) {
    this.invoiceDetailRequestDTO.removeAt(index);
  }
  //#endregion

  //GetAllCategory
  GetAllCategory() {
    this._categoryService.GetAllCategories().subscribe((data: any) => {
      if (data.statusCode == 200) {
        //console.log(data.response);
        for (let i: any = 0; i < data.response.length; i++) {
          this.categoryList[data.response[i].id] =
            data.response[i].categoryName;
        }
      }
    });
  }

  GetTaskAssignemntsList(id: any) {
    this._taskAssignmentService
      .getTaskAssignmentById(id)
      .subscribe((response: any) => {
        //console.log(response);
        if (response.statusCode == 200) {
          console.log(response);

          this.taskAssingmentList[response.response.id] =
            response.response.taskId;

          console.log(this.taskAssingmentList);
        }
      });
  }

  //getAllTask()
  GetAllTasks() {
    this._taskService.getAllTasks().subscribe((data: any) => {
      //console.log(data);
      if (data.statusCode == 200) {
        for (let i: any = 0; i < data.response.length; i++) {
          this.taskList[data.response[i].id] = data.response[i].taskName;
        }
        //console.log(this.taskList)
      }
    });
  }

  Gethours(data: any) {
    const formArrayValues: any =
      this.invoiceForm.controls.invoiceDetailRequestDTO.value;
    //console.log(formArrayValues[data].taskAssignmentId);
    console.log(data + '' + formArrayValues[data].taskAssignmentId);

    this.taskAssingmentId[data] = formArrayValues[data].taskAssignmentId;
  }
  CalculateAmount() {
    this.totalAmountCalc = 0;
    const formArrayValues: any =
      this.invoiceForm.controls.invoiceDetailRequestDTO.value;
    var totalHours = 0;
    for (let i = 0; i < formArrayValues.length; i++) {
      if (
        formArrayValues[i].hoursBilled != null &&
        formArrayValues[i].ratePerHour != null
      ) {
        totalHours += formArrayValues[i].hoursBilled;
      }
    }
    formArrayValues[0].ratePerHour;
    this.totalAmountCalc = totalHours * formArrayValues[0].ratePerHour;
  }
}
