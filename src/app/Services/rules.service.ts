import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RulesService  {


  
  baseURL:string="https://localhost:44363/api/General_Rules";
 
  constructor(private http:HttpClient ) {

   }


   getAllRules(){
    return this.http.get(this.baseURL);
  }
   
  getByIdRules(ruleId:number){
    return this.http.get(`${this.baseURL}/${ruleId}`)

  }

  addRules(rules:any){
    return this.http.post(this.baseURL,rules) 
  }
 
  DeleteRule(id:any){
    return this.http.delete("https://localhost:44363/api/General_Rules?id="+id);
  }
  //  https://localhost:44363/api/General_Rules?id=1

  // deleteRule(ruleId:number){
  //   return this.http.delete(`${this.baseURL}?id=${ruleId}`);
  // }

 
UseRule(id:any){
 return this.http.put("https://localhost:44363/api/General_Rules/"+id , id)
}


  }