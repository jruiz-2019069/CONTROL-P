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

  constructor(
    public navBarRest: NavBarLoginRestService,
    private http: HttpClient
  ) { }
  
  getSupervisors(){
    return this.http.get(environment.baseUrl + "teacher/getSupervisors", {headers:this.htppOptions});
  }

  getGroups(idTeacher:any){
    return this.http.get(environment.baseUrl + "teacher/getGroups/" + idTeacher, {headers:this.htppOptions});
  }

  getStudents(idGroup:any){
    return this.http.get(environment.baseUrl + "teacher/getAlumns/" + idGroup, {headers:this.htppOptions});
  }

  createStudent(idGroup:any, idSupervisor:any, params:{}){
    return this.http.post(environment.baseUrl + "teacher/createAlumn/" + idGroup + "/" + idSupervisor, params, {headers:this.htppOptions});
  }

  getProfileTeacher(idTeacher:any){
    return this.http.get(environment.baseUrl + "teacher/getProfile/" + idTeacher, {headers:this.htppOptions});
  }

  updateProfileTeacher(idTeacher:any, params:{}){
    return this.http.put(environment.baseUrl + "teacher/updateProfile/" + idTeacher, params, {headers:this.htppOptions});
  }
}
