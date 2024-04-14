

//import { Swal } from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [EmployeeService],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  Employees: any;
  Data: any;



  constructor(private employeeservice: EmployeeService) {
  }


  
  ngOnInit(): void {
    this.Employees = this.employeeservice.getAllEmployee().subscribe({
      next: (response) => {
        this.Employees = response;

      },
      error: (myError) => { }
    });
  }






  // deleteProductHandler(employeeId:number){
  //   this.employeeservice.deleteEmployee(employeeId).subscribe({
  //     next:(response)=>{
  //       this.Employees=this.Employees.filter((employee:any)=> employee.id != employeeId)
  //     }
  //   })
  // }
  // deleteEmployee(id: any): Promise<void> {
  //   // Show confirmation popup
  //   return new Promise((resolve, reject) => {
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'You will not be able to recover this data!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, delete it!',
  //       cancelButtonText: 'No, keep it'
  //     }).then((result: { isConfirmed: any; dismiss: any; }) => {
  //       if (result.isConfirmed) {
  //         // User confirmed, perform deletion
  //         this.Employees.deleteEmployee(id).subscribe(() => {
  //           // Filter out the deleted item from AttendData
  //           this.Data = this.Data.filter((item: any) => item.id !== id);
  //           // Optionally, show a success message
  //           Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
  //           resolve(); // Resolve the promise
  //         }, (error: any) => {
  //           console.error('Error deleting data:', error);
  //           reject(); // Reject the promise
  //         });
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         // User canceled, reject the promise
  //         Swal.fire('Cancelled', 'Your data is safe :)', 'error');
  //         reject(); // Reject the promise
  //       }
  //     });
  //   });
  // }
}