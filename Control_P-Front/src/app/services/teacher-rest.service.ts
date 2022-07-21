import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherRestService {

  htppOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    public navBarRest: NavBarLoginRestService,
    private http: HttpClient
  ) { }
  
  getSupervisors(){
    return this.http.get(environment.baseUrl + "teacher/getSupervisors", {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getGroups(idTeacher:any){
    return this.http.get(environment.baseUrl + "teacher/getGroups/" + idTeacher, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getStudents(idGroup:any){
    return this.http.get(environment.baseUrl + "teacher/getAlumns/" + idGroup, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createStudent(idGroup:any, idSupervisor:any, params:{}){
    return this.http.post(environment.baseUrl + "teacher/createAlumn/" + idGroup + "/" + idSupervisor, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getProfileTeacher(idTeacher:any){
    return this.http.get(environment.baseUrl + "teacher/getProfile/" + idTeacher, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateProfileTeacher(idTeacher:any, params:{}){
    return this.http.put(environment.baseUrl + "teacher/updateProfile/" + idTeacher, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
}
