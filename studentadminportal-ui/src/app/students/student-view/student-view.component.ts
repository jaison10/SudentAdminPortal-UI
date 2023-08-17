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
    this.routes.paramMap.subscribe((params)=>{
      this.studentIdFrmURL = params.get("Id"); //this "Id" shud be same as the one given in app.routing for the route provided.
    })

    if(this.studentIdFrmURL){
      console.log("The given ID is: ", this.studentIdFrmURL);
      
      this.StudentService.getStudentDet(this.studentIdFrmURL).subscribe((student : Student)=>{
        console.log(student);
      },
      (error)=>{
        console.log("Error Occured: ", error);
      })
    }
  }

}
