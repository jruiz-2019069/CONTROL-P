import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavBarLoginRestService } from 'src/app/services/login-rest.service';
import { SupervisorRestService } from 'src/app/services/supervisor-rest.service';

@Component({
  selector: 'app-reports-student',
  templateUrl: './reports-student.component.html',
  styleUrls: ['./reports-student.component.css']
})
export class ReportsStudentComponent implements OnInit {

  idStudent:any;
  arrayReports:any=[];
  nameStudent:any;

  constructor(
    public navBarRest: NavBarLoginRestService,
    public supervisorRest: SupervisorRestService,
    public activatedRoute: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (idRuta) => {
      this.idStudent = idRuta.get("idAlumn");
    });
    this.getStudent(this.idStudent);
    this.getReportsStudents();
  }

  getReportsStudents(){
    this.supervisorRest.getReportsStudent(this.idStudent).subscribe({
      next:(res:any)=>{
        this.arrayReports = res.reportsFound;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getStudent(idStudent:any){
    this.supervisorRest.getStudent(idStudent).subscribe({
      next:(res:any)=>{
        this.nameStudent = res.alumnFound.name;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
