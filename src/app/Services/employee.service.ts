import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 
  baseURL:string="https://localhost:44363/api/Employee"; 
  DeptURL:string ="https://localhost:44363/api/Department"
  constructor(private http:HttpClient ) {

   }

  


  getDepartments(){
    return this.http.get(this.DeptURL);
  }

   
   getAllEmployee(){
    return this.http.get(this.baseURL);
  }
  getEmployeeById(EmployeeId:number){
    return this.http.get(`${this.baseURL}/${EmployeeId}`);
  }
  getEmployeeByname(EmployeeName:string){
    return this.http.get(`${this.baseURL}/${EmployeeName}`);
  }

  addEmployee(employee:any){
    return this.http.post <any>(`${this.baseURL}`,employee) 
  }
  deleteEmployee(employeeId:any){
    return this.http.delete(`${this.baseURL}?id=${employeeId}`);
  }

  editEmployee(employeeId:number,employee:any){
    return this.http.put(`${this.baseURL}/${employeeId}`,employee);
  }
}
