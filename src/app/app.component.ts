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
    
      
   

    ]
})
export class AppComponent {
  title = 'HrManagementSystem';
}
