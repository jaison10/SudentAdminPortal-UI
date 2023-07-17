import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

//getting data from the backend and providing to the frontend is done using Services.
//Service wont be created in the beginning when component is generated-hence it can be created using "ng g s <name>"

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private httpURL = "https://localhost:7100"
  constructor(private httpClient: HttpClient) { } //declaring httpclient variable of type HttpClient - this is for routing

  getAllStudents():Observable<Student[]>{ //returns an Observable of type of Student inteface-which is a Model.
    return this.httpClient.get<Student[]>(this.httpURL + "/Student")
  }
}
