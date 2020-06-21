import { LoginRoutes } from './login.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './pages/login-container/login-container.component';
import { LoginFormComponent } from './components/login-form/login-form.component';



@NgModule({
  declarations: [LoginContainerComponent, LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutes
  ]
})
export class LoginModule { }
