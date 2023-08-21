import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from 'src/app/models/student.model';
import { ActivatedRoute } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: [
    './student-view.component.css'
  ],
  // imports: [MatFormFieldModule, MatInputModule]
})
export class StudentViewComponent implements OnInit {

  private studentIdFrmURL : string | null | undefined
  email = new FormControl('', [Validators.required, Validators.email]);
  student : Student = { 
    //defining empty object initially which will be overwritten once the data is fetched from backend - otherwise throws error while loading the page initial as the value wont be assigned.
    'id':'',
    'firstname':'',
    'lastname':'',
    'dob':'',
    'mobile':0,
    'gender':{
      'id':'',
      'description':''
    },
    'address':{
      'id':'',
      'physicalAddress':'',
      'postalAddress':''
    },
    'genderID':'',
    'email':'',
    'profileImgUrl':'',
  };
  studentFName : String | undefined;

  constructor(private StudentService : StudentsService, private readonly routes : ActivatedRoute) {  }

  ngOnInit(): void {
    //this is for reading value from the URL - params
    this.routes.paramMap.subscribe((params)=>{
      this.studentIdFrmURL = params.get("Id"); //this "Id" shud be same as the one given in app.routing for the route provided.
    })

    if(this.studentIdFrmURL){
      console.log("The given ID is: ", this.studentIdFrmURL);
      //if some value is given in route, the below function in Services will be called passing ID.
      this.StudentService.getStudentDet(this.studentIdFrmURL).subscribe((studentData : Student)=>{
        console.log("Data from DB" , studentData);
        this.student = studentData;
        console.log("Saved Data", this.student);
        this.studentFName = this.student?.firstname;      
      },
      (error)=>{ 
        //the backend is expecting a GUID. If the given value isnt a GUID or if the given val is GUID and curresponding student isnt found, both cases will return an error.
        console.log("Error Occured: ", error);
      })
    }
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
