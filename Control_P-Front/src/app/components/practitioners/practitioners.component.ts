import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QualificationModel } from 'src/app/models/qualificationModel';
import { NavBarLoginRestService } from 'src/app/services/login-rest.service';
import { SupervisorRestService } from 'src/app/services/supervisor-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-practitioners',
  templateUrl: './practitioners.component.html',
  styleUrls: ['./practitioners.component.css']
})
export class PractitionersComponent implements OnInit {

  idAlumn:any;
  idSupervisor:any;
  arrayStudents:any =[];
  search:string = "";
  
  qualification:QualificationModel;

  constructor(
    public navBarRest: NavBarLoginRestService,
    public supervisorRest: SupervisorRestService,
    public router: Router
  ) { 
    this.qualification = new QualificationModel("", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.idSupervisor = this.navBarRest.getUser()._id;
    this.getStudents();
  }

  getStudents(){
    this.supervisorRest.getStudents(this.idSupervisor).subscribe({
      next:(res:any)=>{
        this.arrayStudents = res.alumnsFound;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getStudent(idAlumn:any){
    this.supervisorRest.getStudent(idAlumn).subscribe({
      next:(res:any)=>{
        this.idAlumn = res.alumnFound._id;
        console.log(this.idAlumn);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  createQualification(){
    this.supervisorRest.createQualification(this.idSupervisor, this.idAlumn, this.qualification).subscribe({
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
