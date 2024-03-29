import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { EmpSalaryComponent } from './Components/emp-salary/emp-salary.component';
import { EmployeeAttendComponent } from './Components/employee-attend/employee-attend.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet,
      LoginComponent,
      HeaderComponent,
      FooterComponent,
      RouterModule,
      FormsModule,
      CommonModule,
      EmpSalaryComponent,
      EmployeeAttendComponent
    ]
})
export class AppComponent {
  title = 'HrManagementSystem';
}
