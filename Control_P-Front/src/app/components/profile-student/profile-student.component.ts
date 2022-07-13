import { Component, OnInit } from '@angular/core';
import { AlumnModel } from 'src/app/models/alumnModel';
import { NavBarLoginRestService } from 'src/app/services/login-rest.service';
import { StudentRestServiceService } from 'src/app/services/student-rest-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  student:AlumnModel

  constructor(
    public navBarRest: NavBarLoginRestService,
    public studentRest: StudentRestServiceService
  ) { 
    this.student = new AlumnModel("","","","","","",0,"","","")
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.studentRest.getProfile(this.navBarRest.getUser()._id).subscribe({
      next:(res:any)=>{
        this.student._id = res.alumnFound._id;
        this.student.name = res.alumnFound.name;
        this.student.carnet = res.alumnFound.carnet;
        this.student.email = res.alumnFound.email;
        this.student.usernameAlumn = res.alumnFound.usernameAlumn;
        this.student.hoursDone = res.alumnFound.hoursDone;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  updateProfileAlumn(){
    this.studentRest.updateProfile(this.navBarRest.getUser()._id, this.student).subscribe({
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
