import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import {NgForm} from '@angular/forms';
import { NotificationsService } from "angular2-notifications";

import { ClassService } from "../../services/class.service";
import { StudentClass } from "../../models/studentclass";

@Component({
  templateUrl: "./classes.component.html"
})
export class ClassesComponent implements OnInit{

  searchClass :String;
  studentClasses : StudentClass[] =[];


  itemResource = new DataTableResource(this.studentClasses);
  items = [];
  itemCount = 0;
  params = {offset: 0, limit: 10};

  constructor(
    private classService: ClassService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService) { 
}


  ngOnInit() {
    this.getClassData();
  }

  getClassData(){
    console.log("call Class service");
    this.ngProgress.start();
    this.classService
      .getClasses()
      .subscribe(result => {
        this.studentClasses = result;
        //this.items = this.students;
        this.itemResource = new DataTableResource(this.studentClasses);
        this.reloadItems(this.params);
        this.itemResource.count().then(count => this.itemCount = count);
        this.ngProgress.done();
        if(this.studentClasses.length == 0){
          this.notif.info("Information", "There are no Class details in the System.");
        }
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Class details, please try again.");
      });
  }

  reloadItems(params) {
    console.log("reload");
    this.itemResource.query(params).then(items => this.items = items);
}

// special properties:

rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
}

editClass(classd: StudentClass){
  console.log('Clicked: ' + classd.name);
  this.classService.classData = classd;
  this.router.navigate(["/app/updateclass/"+classd.studentClassId]);
}

viewClass(classd: StudentClass){
  console.log('Clicked: ' + classd.name);
  this.classService.classData = classd;
  this.router.navigate(["/app/classdetail/"+classd.studentClassId]);
}

doInactiveClass(classd: StudentClass){
  console.log('Clicked: ' + classd.name);
}

rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
}

rowTooltip(item) { 
  return item.name; 
}

filterData(val:string){
  this.searchClass = val;
  //console.log(val);
  if(val === '')
  {
    this.items = this.studentClasses;
    this.reloadItems(this.params);
  }
 // this.items.filter(val => this.items = val);
 this.items = this.studentClasses.filter(student => student.name.toLowerCase() === val.toLowerCase())
 //console.log(JSON.parse(this.students));
}

}
