import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidayServiceService {

  constructor(private Holidays:HttpClient) { }
  getHoliday(){
    return this.Holidays.get("http://localhost:5001/api/Holiday");
  }
  addHoliday(holiday:any){
    return this.Holidays.post("http://localhost:5001/api/Holiday",holiday);
  }
}
