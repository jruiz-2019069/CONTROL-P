import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { TeacherModel } from 'src/app/models/teacherModel';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  role:any;
  arrayTeachers:any = []
  teacher: TeacherModel;
  search:string="";

  teacherUpdated = {
    _id: "",
    name: "",
    email: "",
    usernameTeacher:"",
    passwordTeacher:"",
    role:""
  }

  constructor(
    public navBarRest: NavBarLoginRestService,
    public adminRest: AdminRestService,
    private router: Router
  ) { 
    this.teacher = new TeacherModel("","","","","","");
  }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
    this.getTeachers();
  }

  getTeachers(){
    this.adminRest.getTeachers().subscribe({
      next:(res:any)=>{
        this.arrayTeachers = res.teachersFound;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getTeacher(idTeacher:any){
    this.adminRest.getTeacher(idTeacher).subscribe({
      next:(res:any)=>{
        this.teacherUpdated._id = res.teacherFound._id;
        this.teacherUpdated.name = res.teacherFound.name;
        this.teacherUpdated.email = res.teacherFound.email;
        this.teacherUpdated.usernameTeacher = res.teacherFound.usernameTeacher;
        this.teacherUpdated.passwordTeacher = res.teacherFound.passwordSupervisor;
        this.teacherUpdated.role = res.teacherFound.role;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createTeacher(){
    this.adminRest.createTeacher(this.teacher).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getTeachers();
      },
      error:(err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  updateTeacher(){
    this.adminRest.updateTeacher(this.teacherUpdated._id, this.teacherUpdated).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getTeachers();
      },
      error:(err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  deleteTeacher(){
    this.adminRest.deleteTeacher(this.teacherUpdated._id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getTeachers();
      },
      error:(err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

}
