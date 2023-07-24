import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DeveloperRoutingModule } from './developer-routing.module';
import { DevTasksComponent } from './dev-tasks/dev-tasks.component';
import { TimeSheetCreateComponent } from './time-sheet-create/time-sheet-create.component';
import { FormsModule } from '@angular/forms';
import { DevDashboardComponent } from './dev-dashboard/dev-dashboard.component';

@NgModule({
  declarations: [
    TimeSheetCreateComponent,
    DevTasksComponent,
    DevDashboardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DeveloperRoutingModule
  ]
})
export class DeveloperModule { }
