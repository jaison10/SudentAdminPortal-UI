import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { StudentsComponent } from './students/students.component';
import { StudentViewComponent } from './students/student-view/student-view.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/students',
    pathMatch : 'full'
  },
  {
    path:'students',
    component : StudentsComponent
  },
  {
    path:'students/:Id',  //if some id is passed along with "students" route, StudentViewComponent will be called.
    component : StudentViewComponent
  }
  ,
  {
    path:'students/createStudent',
    component : StudentViewComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) //this is how routes are defined
  ],
  exports: [    //exporting the routes
    RouterModule
  ]
})
export class AppRoutingModule { }
