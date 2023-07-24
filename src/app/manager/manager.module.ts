import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { TimeSheetApprovalComponent } from './time-sheet-approval/time-sheet-approval.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { TaskAssignmentComponent } from './task-assignment/task-assignment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    TimeSheetApprovalComponent,
    TasksComponent,
    TaskAssignmentComponent,
    InvoiceComponent,
    InvoiceViewComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    ProjectEditComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ]
})
export class ManagerModule { }
