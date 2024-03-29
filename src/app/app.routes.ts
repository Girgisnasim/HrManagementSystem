import { Routes } from '@angular/router';
import { EmpSalaryComponent } from './Components/emp-salary/emp-salary.component';
import { EmployeeAttendComponent } from './Components/employee-attend/employee-attend.component';

export const routes: Routes = [
    { path: '', redirectTo: '/Attend', pathMatch: 'full' },
    {path:"Salary",component:EmpSalaryComponent}, 
    {path:"Attend",component:EmployeeAttendComponent}
];
