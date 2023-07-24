import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { TimeSheetApprovalComponent } from './manager/time-sheet-approval/time-sheet-approval.component';
import { TasksComponent } from './manager/tasks/tasks.component';
import { TaskAssignmentComponent } from './manager/task-assignment/task-assignment.component';
import { DevTasksComponent } from './developer/dev-tasks/dev-tasks.component';
import { TimeSheetCreateComponent } from './developer/time-sheet-create/time-sheet-create.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { InvoiceComponent } from './manager/invoice/invoice.component';
import { GetalluserComponent } from './account/getalluser/getalluser.component';
import { InvoiceViewComponent } from './manager/invoice-view/invoice-view.component';
import { ProjectCreateComponent } from './manager/project/project-create/project-create.component';
import { ProjectListComponent } from './manager/project/project-list/project-list.component';
import { ProjectEditComponent } from './manager/project/project-edit/project-edit.component';
import { AuthGuard } from './account/auth-guard.guard';
import { roleGuardGuard } from './account/role-guard.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
