import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-nav-bar-login',
  templateUrl: './nav-bar-login.component.html',
  styleUrls: ['./nav-bar-login.component.css']
})
export class NavBarLoginComponent implements OnInit {

  //Objeto para poder logearse.
  dataLogin = {
    username: "",
    password: ""
  }

  constructor(
    private navBarRest: NavBarLoginRestService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  //Método para logearse
  login(){
    this.navBarRest.login(this.dataLogin).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.adminFound || res.supervisorFound || res.teacherFound || res.alumnFound));
        if(this.navBarRest.getUser().role == 'ADMIN'){
          this.router.navigateByUrl("/supervisor")
        }else if(this.navBarRest.getUser().role == 'TEACHER'){
          this.router.navigateByUrl("/groupsTeacher")
        }else if(this.navBarRest.getUser().role == 'SUPERVISOR'){
          this.router.navigateByUrl("/practitioners")
        }else if(this.navBarRest.getUser().role == 'ALUMN'){
          this.router.navigateByUrl("/student")
        }
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

}
