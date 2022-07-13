import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavBarLoginRestService } from 'src/app/services/login-rest.service';
import { StudentRestServiceService } from 'src/app/services/student-rest-service.service';

@Component({
  selector: 'app-grades-graphic',
  templateUrl: './grades-graphic.component.html',
  styleUrls: ['./grades-graphic.component.css']
})
export class GradesGraphicComponent implements OnInit {

  role:any;
  idUser:any;
  

  arrayGrades: any;

    chartOptions1 = {
      responsive: true,
      scales: {
          yAxes: [{
                  display: true,
                  ticks: {
                      beginAtZero: true
                  }
              }]
      }
    };
    chartLabels1: any = [
      "creativity",
      "leadership",
      "autodidact",
      "communication",
      "initiative",
      "teamwork"
    ];
    chartLegend1 = true;
    chartPlugins1 = [];

    chartData1: any = [{
       data: [], 
       label: 'GRADES' 
      }];

    chartColors: any = [
      {
        backgroundColor: ["#60CBF7","#FFAEDE" , "#F09B4A", "#BE5DF1", "#54D64B", "#F3D00D"],
      },
  ];

  constructor(
    public navBarRest: NavBarLoginRestService,
    public studentRest: StudentRestServiceService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
    if(this.role === 'ALUMN'){
      this.idUser = this.navBarRest.getUser()._id;
    }else{
      this.activatedRoute.paramMap.subscribe((idRuta)=>{
        this.idUser = idRuta.get("idAlumn");
      });
    }
    this.getGrades();
  }

  getGrades(){
    this.studentRest.getGrades(this.idUser).subscribe({
      next:(res:any)=>{
        this.arrayGrades = res.qualificationFound;
        console.log(this.arrayGrades);
          this.chartData1[0].data.push(this.arrayGrades.creativity);
          this.chartData1[0].data.push(this.arrayGrades.leadership);
          this.chartData1[0].data.push(this.arrayGrades.autodidact);
          this.chartData1[0].data.push(this.arrayGrades.communication);
          this.chartData1[0].data.push(this.arrayGrades.initiative);
          this.chartData1[0].data.push(this.arrayGrades.teamwork);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
