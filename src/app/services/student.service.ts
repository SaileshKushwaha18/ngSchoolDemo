import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { Student } from "../models/student";
import { Status } from "../models/status";
import { StudentFee } from "../models/studentfee";

@Injectable()
export class StudentService {
  
  studentData : Student;
  apiURl : String = "https://ngschooldemo.herokuapp.com";
  
  constructor(
    private http: Http
  ) {}

  getStudents(): Observable<Student[]> {
  
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/students", options)
        .map((response: Response) => response.json());

  }

  addStudent(student: Student): Observable<Student> {
    console.log("we are in the service at addStudent method" + student);
    console.log(JSON.stringify(student));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });


    return this.http
      .post(
        this.apiURl + "/api/students",
        JSON.stringify(student),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  getStudent(studentId: any): Observable<Student> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/students/"+studentId, options)
        .map((response: Response) => response.json());

  }

  updateStudent(student: Student): Observable<Student> {
    console.log("we are in the service at addStudent method" + student);
    console.log(JSON.stringify(student));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });


    return this.http
      .put(
        this.apiURl + "/api/students",
        JSON.stringify(student),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  getStudentFee(studentId: any): Observable<StudentFee> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/studentfees/"+studentId, options)
        .map((response: Response) => response.json());

  }

}
