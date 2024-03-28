import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSalaryService {

  constructor(private HrClient:HttpClient) { 
    
  }
  DataUrl=""
  GetEmployeeSalary(name:any,month:any,year:any){
    // this.DataUrl="http://localhost:5001/api/EmployeeAttend/John?month=3&year=2024";
    this.DataUrl="http://localhost:5001/api/EmployeeAttend/"+name + "?month="+month+"&year="+year;
    return this.HrClient.get(this.DataUrl);
  }
}
