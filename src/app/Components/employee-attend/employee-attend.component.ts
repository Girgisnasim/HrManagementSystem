import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeSalaryService } from '../../Services/employee-salary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-attend',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[EmployeeSalaryService],
  templateUrl: './employee-attend.component.html',
  styleUrl: './employee-attend.component.css'
})
export class EmployeeAttendComponent {
  constructor(private attend:EmployeeSalaryService){
  }
  AttendData:any;
  myForm=new FormGroup({
    FullName:new FormControl('',[Validators.maxLength(15)]),
    DateFrom:new FormControl('Select Month',[Validators.required]),
    DateTo:new FormControl('Select Year',[Validators.required]),
  });

  get validName(){
    return this.myForm.controls.FullName.valid;
  }
  get validDateFrom(){
    return this.myForm.controls.DateTo.valid;
  }
  get validDateTo(){
    return this.myForm.controls.DateFrom.valid;
  }

  GetData(){
    // Check if the form is valid
    if (!this.myForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill all required fields and correct any errors!',
      });
      return;
    }
  
    // Extract values from form controls
    const fullName = this.myForm.value.FullName;
    const dateFromValue = this.myForm.value.DateFrom;
    const dateToValue = this.myForm.value.DateTo;
  
    // Check if dateFromValue and dateToValue are not null or undefined
    if (dateFromValue == null || dateToValue == null) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Please select valid dates!',
      });
      return;
    }
  
    // Convert dateFromValue and dateToValue to Date objects
    const dateFrom = new Date(dateFromValue);
    const dateTo = new Date(dateToValue);
  
    // Check if the converted dates are valid
    if (isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Please select valid dates!',
      });
      return;
    }
  
    // Check if dateTo is greater than or equal to dateFrom
    if (dateFrom > dateTo ) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date Range',
        text: 'Date To should be greater than or equal to Date From!',
      });
      return;
    }

    //range of date
    const currentYear = new Date().getFullYear();
    if (dateFrom.getFullYear() < 2008 || dateTo.getFullYear() > currentYear) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date Range',
        text: `Date To should be between 2008 and ${currentYear}`,
      });
      return;
    }else{
      var dateFromDay= dateFrom.getDate();
      var dateFromMonth=dateFrom.getMonth()+1;
      var dateFromYear=dateFrom.getFullYear();
      var dateToDay= dateTo.getDate();
      var dateToMonth=dateTo.getMonth()+1;
      var dateToYear=dateTo.getFullYear();
      this.attend.GetEmployeeAttend(dateFromDay, dateFromMonth, dateFromYear, dateToDay, dateToMonth, dateToYear, fullName)
      .subscribe((data: any) => {
        console.log(data);
        // Save the data into the AttendData property
        this.AttendData = data;
      }, (error) => {
        // Handle any errors from the API call
        console.error('Error:', error);
      });
      return;
    }
  
  }

  UpdateData(id:any){}
  DeleteData(id:any){}
}
