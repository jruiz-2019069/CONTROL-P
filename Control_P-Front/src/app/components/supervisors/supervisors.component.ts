import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { SupervisorModel } from 'src/app/models/supervisorModel';

@Component({
  selector: 'app-supervisors',
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.css']
})
export class SupervisorsComponent implements OnInit {

  arraySupervisors: any = [];
  supervisor: SupervisorModel;
  search:string ="";

  supervisorUpdated = {
    _id:"",
    name:"",
    nameCompany:"",
    email:"",
    usernameSupervisor:"",
    passwordSupervisor:"",
    role:""
  }

  constructor(
    public navBarRest: NavBarLoginRestService,
    public adminRest: AdminRestService,
    private router: Router
  ) { 
    this.supervisor = new SupervisorModel("","","","","","","");
  }

  ngOnInit(): void {
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

  getSupervisor(idSupervisor:any){
    this.adminRest.getSupervisor(idSupervisor).subscribe({
      next:(res:any)=>{
        this.supervisorUpdated._id = res.supervisorFound._id;
        this.supervisorUpdated.name = res.supervisorFound.name;
        this.supervisorUpdated.nameCompany = res.supervisorFound.nameCompany;
        this.supervisorUpdated.email = res.supervisorFound.email;
        this.supervisorUpdated.usernameSupervisor = res.supervisorFound.usernameSupervisor;
        this.supervisorUpdated.passwordSupervisor = res.supervisorFound.passwordSupervisor;
        this.supervisorUpdated.role = res.supervisorFound.role;    
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createSupervisor(){
    this.adminRest.createSupervisor(this.supervisor).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getSupervisors();
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

  updateSupervisor(){
    this.adminRest.updateSupervisor(this.supervisorUpdated._id, this.supervisorUpdated).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getSupervisors();
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

  deleteSupervisor(){
    this.adminRest.deleteSupervisor(this.supervisorUpdated._id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getSupervisors();
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
