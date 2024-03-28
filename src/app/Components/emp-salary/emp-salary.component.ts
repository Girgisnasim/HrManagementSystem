import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeSalaryService } from '../../Services/employee-salary.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-emp-salary',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers:[EmployeeSalaryService],
  templateUrl: './emp-salary.component.html',
  styleUrl: './emp-salary.component.css'
})
export class EmpSalaryComponent {
  years: number[];
  months: { name: string, number: number }[];
  EmployeeData:any;
  alertShown: boolean=false;


  constructor(private  service : EmployeeSalaryService) {
    this.years = [];
    for (let i = 2008; i <= 2024; i++) {
      this.years.push(i);
    }
    this.months = [
      { name: 'January', number: 1 },
      { name: 'February', number: 2 },
      { name: 'March', number: 3 },
      { name: 'April', number: 4 },
      { name: 'May', number: 5 },
      { name: 'June', number: 6 },
      { name: 'July', number: 7 },
      { name: 'August', number: 8 },
      { name: 'September', number: 9 },
      { name: 'October', number: 10 },
      { name: 'November', number: 11 },
      { name: 'December', number: 12 }
    ];
  }

  myForm=new FormGroup({
    FullName:new FormControl('userName',[Validators.required,Validators.maxLength(15)]),
    Month:new FormControl('Select Month',[Validators.required]),
    Year:new FormControl('Select Year',[Validators.required]),
  });

  get validName(){
    return this.myForm.controls.FullName.valid;
  }
  get validMonth(){
    return this.myForm.controls.Month.valid;
  }
  get validYear(){
    return this.myForm.controls.Year.valid;
  }

  getdata() {
    if (this.validName && this.validMonth && this.validYear ) {
      this.service.GetEmployeeSalary(this.myForm.value.FullName, this.myForm.value.Month, this.myForm.value.Year)
        .subscribe(
          (data) => {
            console.log(data);
            this.EmployeeData = data;
            if ((this.EmployeeData == null || this.EmployeeData == undefined) ) {
              Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Employee data not found!',
              });
              this.alertShown = true; // Set a flag to indicate that the alert has been shown
            }
          },
          (err) => {
            console.log(err);
            if (err.status === 404 ) {
              Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Employee data not found!',
              });
              this.alertShown = true; // Set a flag to indicate that the alert has been shown
            this.EmployeeData=null;
            }
          }
        );
    }
  }
  
  
  
}
