import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from 'src/app/models/student.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  private studentIdFrmURL : string | null | undefined

  constructor(private StudentService : StudentsService, private readonly routes : ActivatedRoute) {  }

  ngOnInit(): void {
    //this is for reading value from the URL - params
    // this.routes.paramMap.subscribe((params)=>{
    //   this.studentIdFrmURL = params.get("Id"); //this "Id" shud be same as the one given in app.routing for the route provided.
    // })

    if(this.studentIdFrmURL){
      console.log("The given ID is: ", this.studentIdFrmURL);
      //if some value is given in route, the below function in Services will be called passing ID.
      this.StudentService.getStudentDet(this.studentIdFrmURL).subscribe((student : Student)=>{
        console.log(student);
      },
      (error)=>{ 
        //the backend is expecting a GUID. If the given value isnt a GUID or if the given val is GUID and curresponding student isnt found, both cases will return an error.
        console.log("Error Occured: ", error);
      })
    }
  }

}
