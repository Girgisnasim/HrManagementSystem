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
    this.DataUrl="http://localhost:5001/api/EmployeeAttend/"+name + "?month="+month+"&year="+year;
    return this.HrClient.get(this.DataUrl);
  }
  GetEmployeeAttend( DayFrom:any, MonthFrom: any , YearFrom: any,DayTo:any, MonthTo: any , YearTo: any,name?: any){
    if(name==null){
      this.DataUrl="http://localhost:5001/api/EmployeeAttend/attend?fromYear="+YearFrom +"&fromMonth="+MonthFrom+"&fromDay="+DayFrom+"&toYear="+YearTo+"&toMonth="+MonthTo+"&toDay="+DayTo;
      return this.HrClient.get(this.DataUrl);
  }else{
    this.DataUrl="http://localhost:5001/api/EmployeeAttend/attend?fromYear="+YearFrom +"&fromMonth="+MonthFrom+"&fromDay="+DayFrom+"&toYear="+YearTo+"&toMonth="+MonthTo+"&toDay="+DayTo+"&name="+name;
    return this.HrClient.get(this.DataUrl);
  }
  }

  Delete_Attend(id:any){
    this.DataUrl="http://localhost:5001/api/EmployeeAttend?id="+id;
    return this.HrClient.delete(this.DataUrl);
  }
}
