import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private HrClient:HttpClient) { 
    
  }
  DataUrl=""
  
  //get all
  GetAll(){
    this.DataUrl="http://localhost:5001/api/Employee";
    return this.HrClient.get(this.DataUrl);
  }
  //Add
  AddAttendance(id:any,hR_id:any){
    this.DataUrl = "http://localhost:5001/api/Attend/"+id+"?hr_id="+hR_id;
    return this.HrClient.post(this.DataUrl,id);
  }
  //leave
  leavingTime(id:any){
    this.DataUrl="http://localhost:5001/api/Attend/"+id;
    return this.HrClient.put(this.DataUrl,id);
  }
}
