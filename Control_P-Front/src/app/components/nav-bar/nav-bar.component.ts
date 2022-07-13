import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role: any = "";
  name:any = "";

  constructor(
    public router: Router,
    public navBarRest: NavBarLoginRestService,
    public adminRest: AdminRestService
  ) { }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
    if(this.role === 'SUPERVISOR'){
      this.getSupervisor();
    }else if(this.role === 'ALUMN'){
      this.getStudent();
    }
    else if(this.role === 'TEACHER'){
      this.getTeacher();
    }else{
      this.name = this.navBarRest.getUser().name;
    }
  }

  closeSession(){
    this.router.navigateByUrl("/home");
    localStorage.clear();
  }

  profile(){
    this.router.navigateByUrl("/profile");
  }

  getSupervisor(){
    this.adminRest.getSupervisor(this.navBarRest.getUser()._id).subscribe({
      next:(res:any)=>{
        this.name  = res.supervisorFound.name;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getStudent(){
    this.adminRest.getStudent(this.navBarRest.getUser()._id).subscribe({
      next:(res:any)=>{
        this.name  = res.alumnFound.name;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getTeacher(){
    this.adminRest.getTeacher(this.navBarRest.getUser()._id).subscribe({
      next:(res:any)=>{
        this.name  = res.teacherFound.name;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}