import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { TeacherRestService } from 'src/app/services/teacher-rest.service';
@Component({
  selector: 'app-students-by-group',
  templateUrl: './students-by-group.component.html',
  styleUrls: ['./students-by-group.component.css']
})
export class StudentsByGroupComponent implements OnInit {

  idGroup:any;
  idTeacher:any;
  role:any;

  arrayStudentsByTeacher:any =[];

  constructor(
    public navBarRest: NavBarLoginRestService,
    public teacherRest: TeacherRestService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (idRuta) => {
      this.idGroup = idRuta.get("idGroup");
    });
    this.getStudents();
  }

  getStudents(){
    this.teacherRest.getStudents(this.idGroup).subscribe({
      next:(res:any)=>{
        this.arrayStudentsByTeacher = res.alumnsFound
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
