import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RulesService } from '../../Services/rules.service';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
     ReactiveFormsModule,
    

  ],
  providers:[ RulesService],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent implements OnInit {
Rule:any ;
RuleId:any;

constructor(private http: HttpClient, private rulesService: RulesService, private router: Router, private activatedroute: ActivatedRoute) {
} 
  ngOnInit(): void {
    this.RuleId=Number(this.activatedroute.snapshot.paramMap.get('id'));
    if (this.RuleId!=0) {
      this.rulesService.getByIdRules(this.RuleId).subscribe({
        next:(response)=>{
           this.Rule=response;
           this.addRules.controls['bouns'].setValue(this.Rule.bonus)
           this.addRules.controls['discound'].setValue(this.Rule.discound)
           this.addRules.controls['offDay1'].setValue(this.Rule.offDay1)
           this.addRules.controls['offDay2'].setValue(this.Rule.offDay2)
         // console.log(response)
      }, error:(myError)=>{""}
    })
    
    }
  }


  addRules=new FormGroup({
    id : new FormControl(0, []),
    bouns:new FormControl('', [
      Validators.required,
    ]),

    discound:new FormControl('', [
      Validators.required,
    ]),

    offDay1 : new FormControl('', [
      Validators.required,
    
    ]),
    offDay2 : new FormControl('', [
      Validators.required,
    
    ])
   });
   
   
   get getBouns(){
    return this.addRules.controls['bouns'];
}

  get getDiscound(){
    return this.addRules.controls['discound'];
}
  get GetOffDayOne(){
    return this.addRules.controls['offDay1'];
  
}
get GetOffDayTwo(){
  return this.addRules.controls['offDay2'];

}

AddRule(e:Event){
  e.preventDefault();
  
  if (this.RuleId == 0) {

    this.rulesService.addRules(this.addRules.value).subscribe({});
    console.log(this.addRules.value);
  } 
  }

  



      //   this.addRules.controls['id'].setValue(this.RuleId);
      //   console.log(this.addRules.value);
      //   this.rulesService.editRules(this.RuleId,this.addRules.value).subscribe({
      // })
    

}

