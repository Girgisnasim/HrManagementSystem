import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { IEmployee } from '../../Models/iemployee';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [EmployeeService],
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.css'
})
export class AddEmpComponent implements OnInit {

 
 
  EmployeeId: any;
  Employee: any;

  departments: any;
  form: any;
  dept_id: any;

  constructor(private http: HttpClient, private employeeservice: EmployeeService, private router: Router, private activatedroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.EmployeeId = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.loadDepartments();
    
    if (this.EmployeeId != 0) {
      this.employeeservice.getEmployeeById(this.EmployeeId).subscribe({
        next: (response) => {
          this.Employee = response;
          this.AddEmp.controls['name'].setValue(this.Employee.name);
          this.AddEmp.controls['address'].setValue(this.Employee.address);
          this.AddEmp.controls['phone'].setValue(this.Employee.phone);
          this.AddEmp.controls['gender'].setValue(this.Employee.gender);
          this.AddEmp.controls['nationality'].setValue(this.Employee.nationality);
          this.AddEmp.controls['ssn'].setValue(this.Employee.ssn);
          this.AddEmp.controls['salary'].setValue(this.Employee.salary);
          this.Employee.hireDate = new Date(this.Employee.hireDate);
          this.AddEmp.controls['hireDate'].setValue(this.Employee.hireDate.toISOString().substring(0, 10));
          this.Employee.birthDate = new Date(this.Employee.birthDate);
          this.AddEmp.controls['birthDate'].setValue(this.Employee.birthDate.toISOString().substring(0, 10));
          this.AddEmp.controls['attendTime'].setValue(this.Employee.attendTime);
          this.AddEmp.controls['leaveTime'].setValue(this.Employee.leaveTime);
          this.AddEmp.controls['dept_id'].setValue(this.Employee.dept_id || 0);
             console.log("Department ID:", this.Employee.dept_id);
        }
      });
    }
  }

  loadDepartments() {
    this.employeeservice.getDepartments().subscribe((data) => {
      this.departments = data;
      console.log(this.departments);
    });
  }

  selectedDepartmentName: number | undefined = 0;

  onDeptChange(event: any) {
    const selectedValue = event.target.value;
    this.selectedDepartmentName = parseInt(selectedValue);
    if (!isNaN(this.selectedDepartmentName)) {
      this.AddEmp.controls['dept_id'].setValue(this.selectedDepartmentName);
    } else {
      console.log("Invalid value for department");
    }
    console.log(this.selectedDepartmentName);
  }

  validateDateRange(minDate: Date, maxDate: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateValue = new Date(control.value);
      if (dateValue < minDate || dateValue > maxDate) {
        return { dateOutOfRange: true };
      }
      return null;
    };
  }

  AddEmp = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    address: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern("01[1235][0-9]{8}"),
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
    nationality: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    birthDate: new FormControl(new Date('01/01/1959'), [
      Validators.required,
      this.validateDateRange(new Date('01/01/1959'), new Date('01/01/2003'))
    ]),
    ssn: new FormControl('', [
      Validators.required,
      Validators.pattern("[0-9]{14}"),
    ]),
    hireDate: new FormControl(new Date('01/01/2008'), [
      Validators.required,
      this.validateDateRange(new Date('01/01/2008'), new Date('01/01/2024'))
    ]),
    salary: new FormControl(0, [
      Validators.required,
      Validators.min(1000)
    ]),
    id: new FormControl(0, []),
    attendTime: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    ]),
    leaveTime: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    ]),
    dept_id: new FormControl(this.selectedDepartmentName, [
      Validators.required,
    ]),
  });

  
  get getName() {
    return this.AddEmp.controls['name'];
  }
  
  get getAddress() {
    return this.AddEmp.controls['address'];
  }
  
  get getPhone() {
    return this.AddEmp.controls['phone'];
  }
  
  get getGender() {
    return this.AddEmp.controls['gender'];
  }
  
  get getNationality() {
    return this.AddEmp.controls['nationality'];
  }
  
  get getSSN() {
    return this.AddEmp.controls['ssn'];
  }
  
  get getSalary() {
    return this.AddEmp.controls['salary'];
  }
  
  get getHireDate() {
    return this.AddEmp.controls['hireDate'];
  }
  
  get getAttend() {
    return this.AddEmp.controls['attendTime'];
  }
  
  get getLeave() {
    return this.AddEmp.controls['leaveTime'];
  }
  
  get getBirthDate() {
    return this.AddEmp.controls['birthDate'];
  }
  
  get getDepartment() {
    return this.AddEmp.controls['dept_id'];
  }
  
 
  AddEmployee(e: Event) {
    
     console.log(this. AddEmp.value)
   
    // console.log(this.EmployeeId);
    // e.preventDefault();
    if (this.EmployeeId == 0) {

      this.employeeservice.addEmployee(this.AddEmp.value).subscribe(
        (data)=>{
          console.log(data);
          
        }
     );
    }
  
}


}