import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {
    path:'',
    component : StudentsComponent
  },
  {
    path:'ha',
    component : StudentsComponent
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
