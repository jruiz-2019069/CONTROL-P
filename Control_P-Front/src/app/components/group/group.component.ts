import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { GroupModel } from 'src/app/models/groupModel';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  role:any;
  arrayGroups: any =[];
  arrayTeachers: any=[];

  idTeacher:any;
  search:string = "";

  group: GroupModel;

  groupUdated = {
    _id: "",
    code: "",
    career: "",
    time: "",
    section: "",
    idTeacher: ""
  }

  constructor(
    public navBarRest: NavBarLoginRestService,
    public adminRest: AdminRestService,
    private router: Router
  ) { 
    this.group = new GroupModel("","","","","","");
  }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
    this.getGroups();
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

  getGroup(idGroup:any){
    this.adminRest.getGroup(idGroup).subscribe({
      next:(res:any)=>{
        this.groupUdated._id = res.groupFound._id;
        this.groupUdated.code = res.groupFound.code;
        this.groupUdated.career = res.groupFound.career;
        this.groupUdated.time = res.groupFound.time;
        this.groupUdated.section = res.groupFound.section;
        this.groupUdated.idTeacher = res.groupFound.idTeacher;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createGroup(){
    this.adminRest.createGroup(this.idTeacher, this.group).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getGroups();
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

  updateGroup(){
    this.adminRest.updateGroup(this.groupUdated._id, this.groupUdated).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getGroups();
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

  deleteGroup(){
    this.adminRest.deleteGroup(this.groupUdated._id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getGroups();
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
