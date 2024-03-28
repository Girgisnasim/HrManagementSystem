import { Routes } from '@angular/router';
import { EmpSalaryComponent } from './Components/emp-salary/emp-salary.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:"Salary",component:EmpSalaryComponent},    // { path: 'employees', loadChildren: './employees/employees.module#EmployeesModule' },
    // { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' },
    // { path: 'projects/:id', loadChildren: './projects/projects.module#ProjectsModule' },
    // { path: 'projects/:id/tasks', loadChildren: './tasks/tasks.module#TasksModule' },
    // { path: 'projects/:id/tasks/:id', loadChildren: './tasks/tasks.module#TasksModule' },
    // { path: 'projects/:id/tasks/:id/edit', loadChildren: './tasks/tasks.module#TasksModule' },
];
