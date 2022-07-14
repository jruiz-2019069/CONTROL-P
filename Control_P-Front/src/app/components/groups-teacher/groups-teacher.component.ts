import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { TeacherRestService } from 'src/app/services/teacher-rest.service';
@Component({
  selector: 'app-groups-teacher',
  templateUrl: './groups-teacher.component.html',
  styleUrls: ['./groups-teacher.component.css']
})
export class GroupsTeacherComponent implements OnInit {

  idTeacher:any;
  arrayGroupsTeacher:any=[];
  search:string = "";

  constructor(
    public navBarRest: NavBarLoginRestService,
    public teacherRest: TeacherRestService
  ) { }

  ngOnInit(): void {
    this.idTeacher = this.navBarRest.getUser()._id
    this.getGroups();
  }

  getGroups(){
    this.teacherRest.getGroups(this.idTeacher).subscribe({
      next:(res:any)=>{
        this.arrayGroupsTeacher = res.groupsFound
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
