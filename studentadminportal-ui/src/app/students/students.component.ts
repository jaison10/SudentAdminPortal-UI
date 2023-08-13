import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { Student } from '../models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  //private allStudents:any[] = [];
  students:MatTableDataSource<Student> = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['fname', 'lname', 'dob', 'mobile', 'gender', 'address'];
  @ViewChild( MatPaginator) matPaginator! : MatPaginator

  constructor(private StudentsServc: StudentsService) { }

  ngOnInit(): void {
    this.StudentsServc.getAllStudents()
    .subscribe(
      (students)=>{
        console.log(students);
        
        this.students = new MatTableDataSource<Student>(students);
        if(this.matPaginator){
            this.students.paginator = this.matPaginator
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
