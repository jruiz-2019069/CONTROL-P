import { Component, OnInit } from '@angular/core';
import {NavBarLoginRestService} from 'src/app/services/login-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { ReportModel } from 'src/app/models/reportModel';
import { StudentRestServiceService } from 'src/app/services/student-rest-service.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  idAlumn:any
  name:any;
  report: ReportModel;
  arrayReports:any = [];
  role:any;

  constructor(
    public navBarRest: NavBarLoginRestService,
    public adminRest: AdminRestService,
    public studentRest: StudentRestServiceService,
    private router: Router
  ){
    this.report = new ReportModel("","","","","");
   }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
    this.idAlumn = this.navBarRest.getUser()._id;
    this.getStudent();
    this.getReports();
  }

  getReports(){
    this.studentRest.getReports(this.idAlumn).subscribe({
      next:(res:any)=>{
        this.arrayReports = res.alumnReports;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  createReport(){
    this.studentRest.createReport(this.idAlumn, this.report).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          timer: 2000
        });
        this.getReports();
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

}
