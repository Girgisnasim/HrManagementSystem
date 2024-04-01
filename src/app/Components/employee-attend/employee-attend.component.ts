import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeSalaryService } from '../../Services/employee-salary.service';
import Swal from 'sweetalert2';
import { CommonModule, NgClass } from '@angular/common';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import 'core-js/modules/web.dom-collections.iterator';

@Component({
  selector: 'app-employee-attend',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
    providers:[EmployeeSalaryService],
  templateUrl: './employee-attend.component.html',
  styleUrl: './employee-attend.component.css',

})
export class EmployeeAttendComponent {
  constructor(private attend:EmployeeSalaryService){
  }
  AttendData:any;
  currentPage = 1;
  itemsPerPage = 5; // Number of items to display per page
  UpdateAttend:any;


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

  GetData() {
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
    if (dateFrom > dateTo) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date Range',
        text: 'Date To should be greater than or equal to Date From!',
      });
      return;
    }

    // Check if dateTo is greater than the current date
    const currentDate = new Date();
    if (dateTo > currentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date To',
        text: 'Date To cannot be greater than the current date!',
      });
      return;
    }

    // Range of date
    const currentYear = new Date().getFullYear();
    if (dateFrom.getFullYear() < 2008 || dateTo.getFullYear() > currentYear) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date Range',
        text: `Date To should be between 2008 and ${currentYear}`,
      });
      return;
    } else {
      var dateFromDay = dateFrom.getDate();
      var dateFromMonth = dateFrom.getMonth() + 1;
      var dateFromYear = dateFrom.getFullYear();
      var dateToDay = dateTo.getDate();
      var dateToMonth = dateTo.getMonth() + 1;
      var dateToYear = dateTo.getFullYear();
      this.attend.GetEmployeeAttend(dateFromDay, dateFromMonth, dateFromYear, dateToDay, dateToMonth, dateToYear, fullName)
        .subscribe((data: any) => {
          console.log(data);
          this.AttendData = data;
          this.currentPage = 1; // Reset current page to 1 when new data is loaded
        }, (error) => {
          console.error('Error:', error);
        });
      return;
    }
}

  nextPage() {
    if ((this.currentPage + 1) <= this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if ((this.currentPage - 1) >= 1) {
      this.currentPage--;
    }
  }

  totalPages() {
    return Math.ceil(this.AttendData.length / this.itemsPerPage);
  }

  getPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.AttendData.slice(startIndex, endIndex);
  }
  printTable() {
    window.print();
  }
  exportToExcel() {
    // Check if there is data to export
    if (!this.AttendData || this.AttendData.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Data',
        text: 'There is no data to export!',
      });
      return;
    }
  
    // Define the headers for the Excel file
    const headers = ['Department Name', 'Name', 'Attend Time', 'Leave Time', 'Date'];
  
    // Extract data from AttendData
    const data = this.AttendData.map((item: { departmentName: any; empName: any; attendTime: any[]; leaveTime: any[]; attendDate: any; }) => {
      return [
        item.departmentName,
        item.empName,
        item.attendTime[0],
        item.leaveTime[0],
        item.attendDate
      ];
    });
  
    // Add headers to the beginning of the data array
    data.unshift(headers);
  
    // Create a new workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
    // Convert data array to worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
  
    // Add worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Employee Attendance');
  
    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'employeeAttendance.xlsx');
  }
  
  
  UpdateData(id:any){
    this.attend.GetAttend(id).subscribe((data)=>{(this.UpdateAttend= data)});
  }
  popupUpdate(){
    let attend= (document.getElementById("Attend") as HTMLInputElement).value;
    let leave=(document.getElementById('Leave') as HTMLInputElement).value ;
    console.log(attend,leave);

    this.UpdateAttend.attendTime=attend;
    this.UpdateAttend.leaveTime=leave;
    console.log(this.UpdateAttend);

    let employeeAttendance = {
      id: 9,
      date: "2024-03-18",
      leaveTime: "20:00:00",
      attendTime: "09:00:00",
      emp_id: 5,
      employee: null,
      hR_id: 2,
      hRs: null
    };

    this.attend.Update_Attend(employeeAttendance).subscribe();

  }
  
  Delete_Attend(id: any): Promise<void> {
    // Show confirmation popup
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, perform deletion
          this.attend.Delete_Attend(id).subscribe(() => {
            // Filter out the deleted item from AttendData
            this.AttendData = this.AttendData.filter((item: any) => item.id !== id);
            // Optionally, show a success message
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            resolve(); // Resolve the promise
          }, (error) => {
            console.error('Error deleting data:', error);
            reject(); // Reject the promise
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User canceled, reject the promise
          Swal.fire('Cancelled', 'Your data is safe :)', 'error');
          reject(); // Reject the promise
        }
      });
    });
  }
}  