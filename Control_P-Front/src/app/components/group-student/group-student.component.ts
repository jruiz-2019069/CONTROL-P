import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentRestServiceService } from 'src/app/services/student-rest-service.service';

@Component({
  selector: 'app-group-student',
  templateUrl: './group-student.component.html',
  styleUrls: ['./group-student.component.css']
})
export class GroupStudentComponent implements OnInit {

  idAlumn:any;
  idGroup:any;

  group = {
    _id:"",
    code:"",
    career:"",
    time:"",
    section:"",
    idTeacher:"",
  }



  constructor(
    public navBarRest: NavBarLoginRestService,
    public studentRest: StudentRestServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idAlumn = this.navBarRest.getUser()._id;
    this.idGroup = this.navBarRest.getUser().idGroup;
    this.getGroup(this.idGroup);
  }

  getGroup(idGroup:any){
    this.studentRest.getGroup(idGroup).subscribe({
      next:(res:any)=>{
        this.group._id = res.groupFound._id;
        this.group.code = res.groupFound.code;
        this.group.career = res.groupFound.career;
        this.group.section = res.groupFound.section;
        this.group.time = res.groupFound.time;
        this.group.idTeacher = res.groupFound.idTeacher.name;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
