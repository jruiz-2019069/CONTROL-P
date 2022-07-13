import { Component, OnInit } from '@angular/core';
import { SupervisorModel } from 'src/app/models/supervisorModel';
import { NavBarLoginRestService } from 'src/app/services/login-rest.service';
import { SupervisorRestService } from 'src/app/services/supervisor-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile-supervisor',
  templateUrl: './profile-supervisor.component.html',
  styleUrls: ['./profile-supervisor.component.css']
})
export class ProfileSupervisorComponent implements OnInit {

  supervisor: SupervisorModel

  constructor(
    public navBarRest: NavBarLoginRestService,
    public supervisorRest:SupervisorRestService
  ) { 
    this.supervisor = new SupervisorModel("","","","","","","");
  }

  ngOnInit(): void {
    this.getProfileSupervisor();
  }

  getProfileSupervisor(){
    this.supervisorRest.getProfileSupervisor(this.navBarRest.getUser()._id).subscribe({
      next:(res:any)=>{
        this.supervisor._id = res.supervisorFound._id;
        this.supervisor.name = res.supervisorFound.name;
        this.supervisor.nameCompany = res.supervisorFound.nameCompany;
        this.supervisor.email = res.supervisorFound.email;
        this.supervisor.usernameSupervisor = res.supervisorFound.usernameSupervisor;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  updateProfileSupervisor(){
    this.supervisorRest.updateProfileSupervisor(this.navBarRest.getUser()._id, this.supervisor).subscribe({
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
