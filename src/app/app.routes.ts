import { Routes } from '@angular/router';
import { EmpSalaryComponent } from './Components/emp-salary/emp-salary.component';
import { EmployeeAttendComponent } from './Components/employee-attend/employee-attend.component';
import { HolidayComponent } from './Components/holiday/holiday.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';

export const routes: Routes = [
    { path: '', redirectTo: '/Attendance', pathMatch: 'full' },
    {path:"Salary",component:EmpSalaryComponent}, 
    {path:"Attend",component:EmployeeAttendComponent},
    {path:"Holiday",component:HolidayComponent}, 
    {path:"Attendance",component:AttendanceComponent}, 


];
