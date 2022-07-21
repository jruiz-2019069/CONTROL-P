import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRestService {

  htppOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    public navBarRest: NavBarLoginRestService,
    private http: HttpClient
  ) { }

  //SUPERVISOR

  getSupervisors(){
    return this.http.get(environment.baseUrl + "admin/getSupervisors", {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getSupervisor(idSupervisor:any){
    return this.http.get(environment.baseUrl + "admin/getSupervisor/" + idSupervisor, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createSupervisor(params:{}){
    return this.http.post(environment.baseUrl + "admin/createSupervisor", params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateSupervisor(idSupervisor:any, params:{}){
    return this.http.put(environment.baseUrl + "admin/updateSupervisor/" + idSupervisor, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  deleteSupervisor(idSupervisor:any){
    return this.http.delete(environment.baseUrl + "admin/deleteSupervisor/" + idSupervisor, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  //TEACHERS

  getTeachers(){
    return this.http.get(environment.baseUrl + "admin/getTeachers", {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getTeacher(idTeacher:any){
    return this.http.get(environment.baseUrl + "admin/getTeacher/" + idTeacher, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createTeacher(params:{}){
    return this.http.post(environment.baseUrl + "admin/createTeacher", params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateTeacher(idTeacher:any, params:{}){
    return this.http.put(environment.baseUrl + "admin/updateTeacher/" + idTeacher, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  deleteTeacher(idTeacher:any){
    return this.http.delete(environment.baseUrl + "admin/deleteTeacher/" + idTeacher, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  //GROUPS

  getGroups(){
    return this.http.get(environment.baseUrl + "admin/getGroups", {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
  
  getGroup(idGroup:any){
    return this.http.get(environment.baseUrl + "admin/getGroup/" + idGroup, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createGroup(idTeacher:any, params:{}){
    return this.http.post(environment.baseUrl + "admin/createGroup/" + idTeacher, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateGroup(idGroup:any, params:{}){
    return this.http.put(environment.baseUrl + "admin/updateGroup/" + idGroup, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  deleteGroup(idGroup:any){
    return this.http.delete(environment.baseUrl + "admin/deleteGroup/" + idGroup, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  //STUDENTS

  getStudents(){
    return this.http.get(environment.baseUrl + "admin/getAlumns", {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
  
  getStudent(idAlumn:any){
    return this.http.get(environment.baseUrl + "admin/getAlumn/" + idAlumn, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createStudent(idGroup:any, idSupervisor:any, params:{}){
    return this.http.post(environment.baseUrl + "admin/createAlumn/" + idGroup + "/" + idSupervisor, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateStudent(idAlumn:any, params:{}){
    return this.http.put(environment.baseUrl + "admin/updateAlumn/" + idAlumn, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  deleteStudent(idAlumn:any){
    return this.http.delete(environment.baseUrl + "admin/deleteAlumn/" + idAlumn, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }



}
