import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router, ActivatedRoute } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import { Validators, FormGroup, FormArray, FormBuilder,NgForm } from '@angular/forms';
import { NotificationsService } from "angular2-notifications";


import { ClassFeeService } from "../../../services/classfee.service";
import { ClassFee } from "../../../models/classfee";

import {FeeTypeService } from "../../../services/feetype.service";
import { ClassFeeType } from "../../../models/classfeetype";

@Component({
  templateUrl: "./classfeedetail.component.html"
})
export class ClassFeeDetailComponent {

  public classFeeForm: FormGroup; // our form model
  classFee : ClassFee = new ClassFee();
  classFeeTypes : ClassFeeType[] =[];

  indexVal:any;

  constructor(
    private classFeeService: ClassFeeService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService,
    private _fb: FormBuilder,
    private feeTypeService: FeeTypeService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params => {
        this.indexVal = params['id'];
      });
}
ngOnInit() {
  this.classFeeForm = this._fb.group({
    name: [{value: '', disabled: true}, [Validators.required, Validators.minLength(5)]],
    description: [{value: '', disabled: true},[Validators.required]],
    startDate:[{value: '', disabled: true},[Validators.required]],
    endDate:[{value: '', disabled: true},[Validators.required]],
    classFeeParams: this._fb.array([
        //this.initAddFeeParams(),
    ])
  });
  this.getFeeTypeData();

  this.ngProgress.start();
  
  console.log(this.classFeeService.classFee);
  if(!this.classFeeService.classFee){
   window.scroll(0,0);
   
   this.classFeeService
     .getClassFee(this.indexVal)
     .subscribe(result => {
       if(result){
         this.classFee = result;
         this.setFormControlsValues();
       } else{
         this.notif.info("Information", "No such record not found in the system, please try again.");
       }
       this.ngProgress.done();
     },
     error =>{
       console.log(error);
       this.ngProgress.done();
       this.notif.error("Failure", "While fetching Student detail, please try again.");
     });
  }else {
   this.classFee=this.classFeeService.classFee;
    this.setFormControlsValues();
   this.ngProgress.done();
  }
  
}

setFormControlsValues() {
  this.classFee.classFeeParams.forEach(element => {
    this.addFeeParams();
  });
  this.classFeeForm.patchValue(this.classFee);
}

getFeeTypeData(){
  console.log("call Class service");
  this.ngProgress.start();
  this.feeTypeService
    .getFeeTypes()
    .subscribe(result => {
      this.classFeeTypes = result;
      this.ngProgress.done();
      if(this.classFeeTypes.length == 0){
        this.notif.info("Information", "There are no Fee Type in the System.");
      }
    },
    error =>{
      console.log(error);
      this.ngProgress.done();
      this.notif.error("Failure", "While fetching Fee Type details, please try again.");
    });
}

initAddFeeParams() {
  // initialize our address
  return this._fb.group({
      classFeeParamsId : [{value: '', disabled: true}],
      classFeeType : [{value: '', disabled: true}, Validators.required],
      feeAmount : [{value: '', disabled: true}, Validators.required]
  });
}

addFeeParams() {
  // add address to the list
  const control = <FormArray>this.classFeeForm.controls['classFeeParams'];
  control.push(this.initAddFeeParams());
}

removeFeeParams(i: number) {
  // remove address from the list
  const control = <FormArray>this.classFeeForm.controls['classFeeParams'];
  control.removeAt(i);
}

editClassFee(classFee: ClassFee){
  console.log('Clicked: ' + classFee.name);
  this.classFeeService.classFee = classFee;
  this.router.navigate(["/app/updateclassfee/"+classFee.classFeeId]);
}

ClearAll(form: NgForm){
  console.log("res"); 
  form.resetForm();
}

fnCompareFeeType(a:ClassFeeType,b :ClassFeeType){
  return a && b && a.classFeeTypeId == b.classFeeTypeId; 

}

}
