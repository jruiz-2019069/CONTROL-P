import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnModel } from 'src/app/models/alumnModel';
import { TeacherRestService } from 'src/app/services/teacher-rest.service';
import { AdminRestService } from 'src/app/services/admin-rest.service';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: AlumnModel;

  arraySupervisors:any =[];
  arrayGroups:any =[];
  arrayStudents:any=[];

  idGroup:any;
  idSupervisor:any;
  idTeacher:any;

  constructor(
    public navBarRest: NavBarLoginRestService,
    public teacherRest: TeacherRestService,
    public adminRest: AdminRestService,
    private router: Router
  ) { 
    this.student = new AlumnModel("","","","","","",0,"","","")
  }

  ngOnInit(): void {
    this.idTeacher = this.navBarRest.getUser()._id
    this.getGroups();
    this.getSupervisors();

  }

  getSupervisors(){
    this.teacherRest.getSupervisors().subscribe({
      next:(res:any)=>{
        this.arraySupervisors = res.supervisorsFound;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getGroups(){
    this.teacherRest.getGroups(this.idTeacher).subscribe({
      next:(res:any)=>{
        this.arrayGroups = res.groupsFound
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createStudent(){
    this.teacherRest.createStudent(this.idGroup, this.idSupervisor, this.student).subscribe({
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
