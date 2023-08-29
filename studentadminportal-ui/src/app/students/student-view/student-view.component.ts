import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from 'src/app/models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, Validators } from '@angular/forms';
import { Gender } from 'src/app/models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

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
  student : Student = { //defining empty object initially which will be overwritten once the data is fetched from backend - otherwise throws error while loading the page initial as the value wont be assigned.
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
  genders : Gender[] | null = [];
  existingUser : Boolean = false;
  profileImageUrl : String = '';

  constructor(
    private StudentService : StudentsService, 
    private readonly routes : ActivatedRoute, private snackbar : MatSnackBar, 
    private router:Router) {  }

  ngOnInit(): void {
    //this is for reading value from the URL - params
    this.routes.paramMap.subscribe((params)=>{  
      if(params.get("Id")?.toLowerCase()!='createStudent'.toLowerCase()){        
        this.studentIdFrmURL = params.get("Id"); //this "Id" shud be same as the one given in app.routing for the route provided.
        console.log("LOADED AGAIN and the ID is", this.studentIdFrmURL);

        this.existingUser = true;
        this.SetProfileImage();
      }else{
        this.studentFName = 'Insert';
      } 
    })
    
    if(this.studentIdFrmURL){
      //if some value is given in route, the below function in Services will be called passing ID.
      console.log("GOING TO FETCH DATA", this.studentIdFrmURL);
      
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

    this.StudentService.GetAllGenders().subscribe((genderData)=>{
      this.genders = genderData
    },
    (error : any)=>{
        console.log("Error Occured: ", error);
    })
  }
  
  UpdateStudent() : void{
    console.log("Going to update student", this.student);
    console.log("ID being decided to update from 'UpdateStudent' function", this.student.id);
    //here "this.student" can be passed directly as it is 2 way binding -whatever edited in the window will already be saved in this student var
      this.StudentService.UpdateStudentDetails(this.student.id, this.student).subscribe((studentData : Student)=>{
        this.studentFName = studentData?.firstname;  //studentFName is a fixed var hence need to reassign.
        this.snackbar.open("Student Details Updated!", undefined, {
          duration: 3000
        });
      },
      (error)=>{ 
        //the backend is expecting a GUID. If the given value isnt a GUID or if the given val is GUID and curresponding student isnt found, both cases will return an error.
        console.log("Error Occured: ", error);
      })
  }

  CreateStudent(): void{
    console.log(this.student);
    this.StudentService.CreateStudent(this.student).subscribe((studentData: Student)=>{
      this.student = studentData;
      this.router.navigateByUrl(`/students/${studentData.id}`);
      this.studentFName = studentData.firstname;
      this.snackbar.open("Created New Student Successfully!", undefined, {
        duration: 3000
      });
    },(error)=>{
      console.log("Error Occured: ", error);
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  private SetProfileImage():void{
    console.log("The profile URL : ", this.student.profileImgUrl);
    
    if(this.student.profileImgUrl){

    }else
    {
      this.profileImageUrl = "../../../assets/Images/dummy-avatar.png"
    }
  }

}
