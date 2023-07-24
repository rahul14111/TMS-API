import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GetalluserComponent } from './getalluser/getalluser.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './auth-guard.guard';
import { roleGuardGuard } from './role-guard.guard';

const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'Sign-In', component: SignInComponent},
  {path: 'Create-Account', component: CreateAccountComponent, canActivate:[AuthGuard,roleGuardGuard]},
  {path: 'forgetPassword', component: ForgetPasswordComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path :'updateProfile', component : UpdateProfileComponent, canActivate:[AuthGuard]},
  {path : 'changePassword', component : ChangePasswordComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
