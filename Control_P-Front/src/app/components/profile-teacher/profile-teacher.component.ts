import { Component, OnInit } from '@angular/core';
import { TeacherModel } from 'src/app/models/teacherModel';
import { NavBarLoginRestService } from 'src/app/services/login-rest.service';
import { TeacherRestService } from 'src/app/services/teacher-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.css']
})
export class ProfileTeacherComponent implements OnInit {

  teacher:TeacherModel;

  constructor(
    public navBarRest: NavBarLoginRestService,
    public teacherRest: TeacherRestService
  ) { 
    this.teacher = new TeacherModel("","","","","","");
  }

  ngOnInit(): void {
    this.getProfileTeacher();
  }

  getProfileTeacher(){
    this.teacherRest.getProfileTeacher(this.navBarRest.getUser()._id).subscribe({
      next:(res:any)=>{
        this.teacher._id = res.teacherFound._id;
        this.teacher.name = res.teacherFound.name;
        this.teacher.email = res.teacherFound.email;
        this.teacher.usernameTeacher = res.teacherFound.usernameTeacher;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  updateProfileTeacher(){
    this.teacherRest.updateProfileTeacher(this.navBarRest.getUser()._id, this.teacher).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
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
