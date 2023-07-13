import { Component, OnInit } from '@angular/core';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private StudentsServc: StudentsService) { }

  ngOnInit(): void {
  this.StudentsServc.getAllStudents()
  .subscribe(
    (success)=>{
      console.log(success);
    },
    (error)=>{
      console.log(error);
    }
  );
  }

}
