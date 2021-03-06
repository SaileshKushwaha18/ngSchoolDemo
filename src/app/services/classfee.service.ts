import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { ClassFeeType } from "../models/ClassFeeType";
import { ClassFee } from "../models/classfee";
import {StudentClass } from "../models/studentclass";
import { GenerateFee } from "../models/generatefee";

@Injectable()
export class ClassFeeService {
  classFee : ClassFee;
  apiURl : String = "https://ngschooldemo.herokuapp.com";
  
  constructor(
    private http: Http
  ) {}

  getclassFees(): Observable<ClassFee[]> {
    console.log("we are in the service at Get ClassFeeService method");
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/classfee", options)
        .map((response: Response) => {
          console.log(response.json())
          return response.json();
        });
  }

  addClassFee(classFee: ClassFee): Observable<ClassFee> {
    console.log("we are in the service at studentClass method" + classFee);
    console.log(JSON.stringify(classFee));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        this.apiURl + "/api/classfee",
        JSON.stringify(classFee),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  getClassFee(id: any): Observable<ClassFee> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/classfee/"+id, options)
        .map((response: Response) => response.json());

  }

  updateClassFee(classFee: ClassFee): Observable<ClassFee> {
    console.log("we are in the service at studentClass method" + classFee);
    console.log(JSON.stringify(classFee));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });


    return this.http
      .put(
        this.apiURl + "/api/classfee",
        JSON.stringify(classFee),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  generateStudentFee(generateFee: GenerateFee): Observable<GenerateFee> {
    console.log("we are in the service at generateStudentFee method" + generateFee);
    console.log(JSON.stringify(generateFee));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        this.apiURl + "/api/generatestudentfee",
        generateFee,
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

}
