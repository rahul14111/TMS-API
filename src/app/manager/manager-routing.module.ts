import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { AuthGuard } from '../account/auth-guard.guard';
import { roleGuardGuard } from '../account/role-guard.guard';
import { TimeSheetApprovalComponent } from './time-sheet-approval/time-sheet-approval.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskAssignmentComponent } from './task-assignment/task-assignment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard,roleGuardGuard]},
  {path : 'InvoiceView/:InvoiceId', component : InvoiceViewComponent, canActivate:[AuthGuard,roleGuardGuard]},
  {path: 'project-add',component:ProjectCreateComponent,canActivate:[AuthGuard,roleGuardGuard]},
  {path: 'project-list',component:ProjectListComponent,canActivate:[AuthGuard]},
  {path: 'project-edit/:id',component:ProjectEditComponent,canActivate:[AuthGuard,roleGuardGuard]},
  {path: 'TimeSheetApproval', component: TimeSheetApprovalComponent,canActivate:[AuthGuard,roleGuardGuard]},
  {path : 'Tasks', component: TasksComponent,canActivate:[AuthGuard,roleGuardGuard]},
  {path: 'TaskAssignment' ,component: TaskAssignmentComponent,canActivate:[AuthGuard,roleGuardGuard]},
  {path : 'Invoice/:TimeSheetId', component:InvoiceComponent,canActivate:[AuthGuard,roleGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
