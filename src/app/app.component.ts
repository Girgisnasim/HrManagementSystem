import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

import { AddEmpComponent } from './Components/add-emp/add-emp.component';
import { RulesComponent } from './Components/rules/rules.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { EmployeesComponent } from './Components/employees/employees.component';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { EmpSalaryComponent } from './Components/emp-salary/emp-salary.component';
import { EmployeeAttendComponent } from './Components/employee-attend/employee-attend.component';
import { HolidayComponent } from './Components/holiday/holiday.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';



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

      AddEmpComponent ,
      RouterModule,
      RulesComponent ,
      FormsModule,
      RouterModule,
      EmployeesComponent, 
      HttpClientModule,
    
      
   


      RouterModule,
      FormsModule,
      CommonModule,
      EmpSalaryComponent,
      EmployeeAttendComponent,
      HolidayComponent,
      AttendanceComponent
    ]
})
export class AppComponent {
  title = 'HrManagementSystem';
}
