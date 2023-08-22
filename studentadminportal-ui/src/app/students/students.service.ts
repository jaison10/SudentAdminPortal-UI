import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { Gender } from '../models/gender.model';
import { UpdateRequestDetails } from '../models/update-request.model';

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
  //if "students/someid" is given in the frontend, the below url in the backend will be called which accepts a GUID.
  getStudentDet(studentId : string):Observable<Student>{
    return this.httpClient.get<Student>(this.httpURL+"/Student/" + studentId)
  }
  GetAllGenders():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.httpURL+"/Gender/")
  }
  UpdateStudentDetails(studentId : string, incomingData : Student):Observable<Student>{
    var requestData : UpdateRequestDetails = {
      dob: incomingData.dob,
      firstname : incomingData.firstname,
      lastname: incomingData.lastname,
      mobile: incomingData.mobile,
      email:incomingData.email,
      genderID: incomingData.genderID,
      physicalAddress: incomingData.address.physicalAddress,
      postalAddress: incomingData.address.postalAddress 
    }
    return this.httpClient.put(this.httpURL+ "/Student/" + studentId, requestData)
  }
}
