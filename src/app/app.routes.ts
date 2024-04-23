import { Routes } from '@angular/router';

import { AddEmpComponent } from './Components/add-emp/add-emp.component';
import { RulesComponent } from './Components/rules/rules.component';
import { ErrorComponent } from './Components/error/error.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { EmpSalaryComponent } from './Components/emp-salary/emp-salary.component';
import { EmployeeAttendComponent } from './Components/employee-attend/employee-attend.component';
import { HolidayComponent } from './Components/holiday/holiday.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';
import { PermissionsComponent } from './Components/permissions/permissions.component';



export const routes: Routes = [
   { path: '', redirectTo: '/Addemp', pathMatch: 'full' },
   { path: "Addemp",component:AddEmpComponent },
   { path: "Employees",component:EmployeesComponent },
   { path: 'Rules',component:RulesComponent},
   {path:"Salary",component:EmpSalaryComponent}, 
    {path:"Attend",component:EmployeeAttendComponent},
    {path:"Holiday",component:HolidayComponent}, 

    {path:"Attendance",component:AttendanceComponent},
    {path:"Permissions",component:PermissionsComponent},  
    { path: '**',component:ErrorComponent},

]





