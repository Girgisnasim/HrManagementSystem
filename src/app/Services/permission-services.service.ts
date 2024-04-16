import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionServicesService {
  constructor(private Permissions_Ser:HttpClient) { }
  //Get All Department 
  GetAllDepartment(){
    return this.Permissions_Ser.get("http://localhost:5001/api/Department");
  }
}
