import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceService } from '../../Services/attendance.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [AttendanceService],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  Employee: any;
  currentPage = 1;
  itemsPerPage = 5; // Number of items to display per page

  constructor(private attendanceService: AttendanceService){

  }
  ngOnInit(): void {
    this.GetAllEmployee();
  }
  GetAllEmployee(){
    this.attendanceService.GetAll().subscribe(data=>{
      console.log(data);
      this.Employee=data;
      console.log(this.Employee);
    })
  }

  Attendance(id: any,hR_id:any): void {
    
    this.attendanceService.AddAttendance(id,hR_id).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Attendance added successfully!'
        });
      },
      error: (error) => {
        console.error(error);
        {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Employee has already added attendance before.'
          });
        }
      }
    });
  }
  leaveTime(id: any): void {
    console.log("leave time called");
    this.attendanceService.leavingTime(id).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Leave time added successfully!'
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Employee has already added leavingTime before.'
        });
      }
    });
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
  return Math.ceil(this.Employee.length / this.itemsPerPage);
}

getPageItems() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.Employee.slice(startIndex, endIndex);
}
}

  
  
  
