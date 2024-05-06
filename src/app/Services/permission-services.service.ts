import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ipermission } from '../Models/ipermission';

@Injectable({
  providedIn: 'root'
})
export class PermissionServicesService {
  constructor(private Permissions_Ser:HttpClient) { }
  //Get All Department 
  GetAllDepartment(){
    return this.Permissions_Ser.get("https://localhost:7006/api/Role");
  }

  addpermission(listpermission:Ipermission){
    return this.Permissions_Ser.post("https://localhost:7006/api/Role/AddPermission",listpermission)
  }
}
