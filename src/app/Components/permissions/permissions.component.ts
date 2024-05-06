import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionServicesService } from '../../Services/permission-services.service';
import { Ipermission } from '../../Models/ipermission';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers:[PermissionServicesService],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit {
  departments:any;
  roleId:any;
  alertShown: boolean=false;
  allpermission:Ipermission;
  constructor(private permission:PermissionServicesService){
    this.allpermission={
      "roleId": "",
      "roleName": "asd",
      "roleClaims": [
        {
          "displayValue": "Permissions.Roles.View",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Roles.Create",
          "isSelected": true
        },
        {
          "displayValue": "Permissions.Roles.Edit",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Roles.Delete",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Users.View",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Users.Create",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Users.Edit",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Users.Delete",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Employees.View",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Employees.Create",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Employees.Edit",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Employees.Delete",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.GeneralSettings.View",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.GeneralSettings.Create",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.GeneralSettings.Edit",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.GeneralSettings.Delete",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Holidays.View",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Holidays.Create",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Holidays.Edit",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Holidays.Delete",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Attendance.View",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Attendance.Create",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Attendance.Edit",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.Attendance.Delete",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.SalaryReport.View",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.SalaryReport.Create",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.SalaryReport.Edit",
          "isSelected": false
        },
        {
          "displayValue": "Permissions.SalaryReport.Delete",
          "isSelected": false
        }
      ]
    }
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.permission.GetAllDepartment().subscribe(res=>{
      console.log(res);
      this.departments=res;
      let nameToRemove = "Admin";
      this.departments = this.departments.filter((item:any) => item.name !== nameToRemove);
    })
   

  }

  addpermission(){
    this.allpermission.roleId=this.roleId
    console.log(this.allpermission)
    this.permission.addpermission(this.allpermission).subscribe((data)=>{
      console.log(data); // Check the response from the server
      Swal.fire({
        icon: 'success',
        title: 'Permission added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    }, (error) => {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add permission',
        text: 'An error occurred while adding permission. Please try again.',
      });
    });
}


}
