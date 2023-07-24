import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevTasksComponent } from './dev-tasks/dev-tasks.component';
import { TimeSheetCreateComponent } from './time-sheet-create/time-sheet-create.component';
import { CreateAccountComponent } from '../account/create-account/create-account.component';
import { GetalluserComponent } from '../account/getalluser/getalluser.component';
import { AuthGuard } from '../account/auth-guard.guard';
import { DevDashboardComponent } from './dev-dashboard/dev-dashboard.component';

const routes: Routes = [
  {path: 'dev-dashboard', component: DevDashboardComponent,canActivate:[AuthGuard]},
  {path: 'dev-Tasks', component: DevTasksComponent,canActivate:[AuthGuard]},
  {path: 'TimeSheetCreate', component: TimeSheetCreateComponent,canActivate:[AuthGuard]},
  {path: 'createaccount', component: CreateAccountComponent,canActivate:[AuthGuard]},
  {path: 'getAllUser', component: GetalluserComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule { }
