import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { Student } from '../models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  //private allStudents:any[] = [];
  students:MatTableDataSource<Student> = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['fname', 'lname', 'dob', 'mobile', 'gender', 'edit', 'delete'];
  @ViewChild( MatPaginator) matPaginator! : MatPaginator
  @ViewChild( MatSort) matSort! : MatSort
  filterString ='';

  constructor(private StudentsServc: StudentsService, private readonly snackbar: MatSnackBar, private router : Router) { }

  ngOnInit(): void {
    this.StudentsServc.getAllStudents()
    .subscribe(
      (students)=>{
        console.log(students);
        
        this.students = new MatTableDataSource<Student>(students);
        if(this.matPaginator){
            this.students.paginator = this.matPaginator
        }
        if(this.matSort){
          this.students.sort = this.matSort
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  filterSudent(){
    this.students.filter = this.filterString.trim().toLowerCase();
  }

  DeleteStudent(id: String){
    console.log("The ID is: ", id);
    
    this.StudentsServc.DeleteStudent(id).subscribe((deletedStudent)=>{
      this.snackbar.open(`Details of student ${deletedStudent.firstname} has been deleted successfully!`, undefined, {
        duration: 3000
      });  
      this.router.navigateByUrl('students');
    },(error)=>{
      console.log("Student deletion failed: ", error);
    });
  }

}
