import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HolidayServiceService } from '../../Services/holiday-service.service';
import Swal from 'sweetalert2';
import { IHoliday } from '../../Models/iholiday';

@Component({
  selector: 'app-holiday',
  standalone: true,
  imports: [   
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers:[HolidayServiceService],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent implements OnInit {
  Holidays: any;
constructor(private HolidayService:HolidayServiceService){}
  ngOnInit(): void {
    this.GetAllHolidays();
  }
  myForm=new FormGroup ({
    HolidayName:new FormControl(null,[Validators.required]),
    date: new FormControl(null,[Validators.required])
  });
  get validName(){   
    return this.myForm.controls.HolidayName.valid;
  }
  get validDate(){
    return this.myForm.controls.date.valid;
  }
  GetAllHolidays(){
    this.HolidayService.getHoliday()
    .subscribe(
        (data) => {
          console.log(data);
          this.Holidays = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

   AddHoliday(){
    
    if (this.validName && this.validDate) {
      let holiday:IHoliday={
        id: 1,
        "name": this.myForm.value.HolidayName??"",
        "date": this.myForm.value.date??"",
        hR_id: null
      }
      this.HolidayService.addHoliday(holiday)
    .subscribe(
        (data) => {
          console.log(data);
          Swal.fire({
            icon:'success',
            title: 'Success',
            text: 'Holiday added successfully!'
          });
          this.GetAllHolidays();
          this.myForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
