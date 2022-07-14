import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { AlumnModel } from 'src/app/models/alumnModel';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  role:any;
  arrayStudents:any = [];
  arraySupervisors:any =[];
  arrayGroups:any =[];

  idGroup:any;
  idSupervisor:any;
  search: string="";

  studentUpdated = {
    _id:"",
    name:"",
    carnet:"",
    email:"",
    usernameAlumn:"",
    passwordAlumn:"",
    hoursDone:"",
    idGroup:"",
    idSupervisor:"",
    role:""
  }

  student: AlumnModel;

  constructor(
    public navBarRest: NavBarLoginRestService,
    public adminRest: AdminRestService,
    private router: Router
  ) { 
    this.student = new AlumnModel("","","","","","",0,"","","");
  }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
    this.getStudents();
    this.getGroups();
    this.getSupervisors();
  }

  getSupervisors(){
    this.adminRest.getSupervisors().subscribe({
      next:(res:any)=>{
        this.arraySupervisors = res.supervisorsFound;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getGroups(){
    this.adminRest.getGroups().subscribe({
      next:(res:any)=>{
        this.arrayGroups = res.groupsFound
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getStudents(){
    this.adminRest.getStudents().subscribe({
      next:(res:any)=>{
        this.arrayStudents = res.alumnsFound;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getStudent(idAlumn:any){
    this.adminRest.getStudent(idAlumn).subscribe({
      next:(res:any)=>{
        this.studentUpdated._id = res.alumnFound._id;
        this.studentUpdated.name = res.alumnFound.name;
        this.studentUpdated.carnet = res.alumnFound.carnet;
        this.studentUpdated.email = res.alumnFound.email;
        this.studentUpdated.usernameAlumn = res.alumnFound.usernameAlumn;
        this.studentUpdated.passwordAlumn = res.alumnFound.passwordAlumn;
        this.studentUpdated.hoursDone = res.alumnFound.hoursDone;
        this.studentUpdated.idGroup = res.alumnFound.idGroup;
        this.studentUpdated.idSupervisor = res.alumnFound.idSupervisor;
        this.studentUpdated.role = res.alumnFound.role;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createStudent(){
    this.adminRest.createStudent(this.idGroup, this.idSupervisor, this.student).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getStudents();
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

  updateStudent(){
    this.adminRest.updateStudent(this.studentUpdated._id, this.studentUpdated).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getStudents();
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

  deleteStudent(){
    this.adminRest.deleteStudent(this.studentUpdated._id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getStudents();
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
