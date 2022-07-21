import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorRestService {

  htppOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    public navBarRest: NavBarLoginRestService,
    private http: HttpClient
  ) { }

  getStudents(idSupervisor:any){
    return this.http.get(environment.baseUrl + "supervisor/getAlumns/" + idSupervisor, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getStudent(idAlumn:any){
    return this.http.get(environment.baseUrl + "supervisor/getAlumn/" + idAlumn, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createQualification(idSupervisor:any, idAlumn:any, params:{}){
    return this.http.post(environment.baseUrl + "supervisor/createQualification/" + idSupervisor + "/" + idAlumn, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getReportsStudent(idAlumn:any){
    return this.http.get(environment.baseUrl + "supervisor/getReportsAlumn/" + idAlumn, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getProfileSupervisor(idSupervisor:any){
    return this.http.get(environment.baseUrl + "supervisor/getProfile/" + idSupervisor, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateProfileSupervisor(idSupervisor:any, params:{}){
    return this.http.put(environment.baseUrl + "supervisor/updateProfileSupervisor/" + idSupervisor, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
}
