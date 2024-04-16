import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionServicesService } from '../../Services/permission-services.service';

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
  constructor(private permission:PermissionServicesService){}
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.permission.GetAllDepartment().subscribe(res=>{
      console.log(res);
      this.departments=res;
    })
  }
}
