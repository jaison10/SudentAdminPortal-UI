import { Component, OnInit } from '@angular/core';
import { StudentsService } from './students.service';
import { Student } from '../models/student.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  //private allStudents:any[] = [];
  students = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['fname', 'lname', 'dob', 'mobile', 'gender', 'address'];

  constructor(private StudentsServc: StudentsService) { }

  ngOnInit(): void {
    this.StudentsServc.getAllStudents()
    .subscribe(
      (students)=>{
        this.students = new MatTableDataSource<Student>(students);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
