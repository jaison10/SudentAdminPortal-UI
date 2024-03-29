import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { Gender } from '../models/gender.model';
import { UpdateRequestDetails } from '../models/update-request.model';
import { environment } from 'src/environments/environment';

//getting data from the backend and providing to the frontend is done using Services.
//Service wont be created in the beginning when component is generated-hence it can be created using "ng g s <name>"

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private httpURL = environment.httpURL;
  
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
  UpdateStudentDetails(studentId : String, incomingData : Student):Observable<Student>{
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
    console.log("CHANGED DATA", requestData);
    console.log("Student ID to update", studentId);
    
    
    return this.httpClient.put<Student>(this.httpURL+ "/Student/" + studentId, requestData)
  }
  DeleteStudent(studentId: String):Observable<Student>{
    return this.httpClient.delete<Student>(this.httpURL+ "/Student/" + studentId); 
  }
  CreateStudent(incomingData :Student):Observable<Student>{
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
    return this.httpClient.post<Student>(this.httpURL + "/Student", requestData);
  }
  
  UploadImage(studentId: String, file: File):Observable<any>{
    console.log("The student id ", studentId);
    
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this.httpClient.post<Student>(this.httpURL + "/Student/" + studentId + "/upload-profile", formData, {
      reportProgress:  true,
      // headers: { 'content-type': 'multipart/form-data' }
    });
    }

    GetImagePath(relativePath : String): String{
      return `${this.httpURL}/${relativePath}`;
    }
}

