import { Routes } from '@angular/router';
import { AddEmpComponent } from './Components/add-emp/add-emp.component';
import { RulesComponent } from './Components/rules/rules.component';
import { ErrorComponent } from './Components/error/error.component';
import { EmployeesComponent } from './Components/employees/employees.component';

export const routes: Routes = [
   { path: '', redirectTo: '/Addemp', pathMatch: 'full' },
   { path: "Addemp",component:AddEmpComponent },
   { path: "Employees",component:EmployeesComponent },
   { path: 'Rules',component:RulesComponent},
   { path: '**',component:ErrorComponent},


];


