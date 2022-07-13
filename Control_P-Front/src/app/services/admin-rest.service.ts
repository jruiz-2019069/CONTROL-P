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

  constructor(
    public navBarRest: NavBarLoginRestService,
    private http: HttpClient
  ) { }

  //SUPERVISOR

  getSupervisors(){
    return this.http.get(environment.baseUrl + "admin/getSupervisors", {headers:this.htppOptions});
  }

  getSupervisor(idSupervisor:any){
    return this.http.get(environment.baseUrl + "admin/getSupervisor/" + idSupervisor, {headers:this.htppOptions});
  }

  createSupervisor(params:{}){
    return this.http.post(environment.baseUrl + "admin/createSupervisor", params, {headers:this.htppOptions});
  }

  updateSupervisor(idSupervisor:any, params:{}){
    return this.http.put(environment.baseUrl + "admin/updateSupervisor/" + idSupervisor, params, {headers:this.htppOptions});
  }

  deleteSupervisor(idSupervisor:any){
    return this.http.delete(environment.baseUrl + "admin/deleteSupervisor/" + idSupervisor, {headers:this.htppOptions});
  }

  //TEACHERS

  getTeachers(){
    return this.http.get(environment.baseUrl + "admin/getTeachers", {headers:this.htppOptions});
  }

  getTeacher(idTeacher:any){
    return this.http.get(environment.baseUrl + "admin/getTeacher/" + idTeacher, {headers:this.htppOptions});
  }

  createTeacher(params:{}){
    return this.http.post(environment.baseUrl + "admin/createTeacher", params, {headers:this.htppOptions});
  }

  updateTeacher(idTeacher:any, params:{}){
    return this.http.put(environment.baseUrl + "admin/updateTeacher/" + idTeacher, params, {headers:this.htppOptions});
  }

  deleteTeacher(idTeacher:any){
    return this.http.delete(environment.baseUrl + "admin/deleteTeacher/" + idTeacher, {headers:this.htppOptions});
  }

  //GROUPS

  getGroups(){
    return this.http.get(environment.baseUrl + "admin/getGroups", {headers:this.htppOptions});
  }
  
  getGroup(idGroup:any){
    return this.http.get(environment.baseUrl + "admin/getGroup/" + idGroup, {headers:this.htppOptions});
  }

  createGroup(idTeacher:any, params:{}){
    return this.http.post(environment.baseUrl + "admin/createGroup/" + idTeacher, params, {headers:this.htppOptions});
  }

  updateGroup(idGroup:any, params:{}){
    return this.http.put(environment.baseUrl + "admin/updateGroup/" + idGroup, params, {headers:this.htppOptions});
  }

  deleteGroup(idGroup:any){
    return this.http.delete(environment.baseUrl + "admin/deleteGroup/" + idGroup, {headers:this.htppOptions});
  }

  //STUDENTS

  getStudents(){
    return this.http.get(environment.baseUrl + "admin/getAlumns", {headers:this.htppOptions});
  }
  
  getStudent(idAlumn:any){
    return this.http.get(environment.baseUrl + "admin/getAlumn/" + idAlumn, {headers:this.htppOptions});
  }

  createStudent(idGroup:any, idSupervisor:any, params:{}){
    return this.http.post(environment.baseUrl + "admin/createAlumn/" + idGroup + "/" + idSupervisor, params, {headers:this.htppOptions});
  }

  updateStudent(idAlumn:any, params:{}){
    return this.http.put(environment.baseUrl + "admin/updateAlumn/" + idAlumn, params, {headers:this.htppOptions});
  }

  deleteStudent(idAlumn:any){
    return this.http.delete(environment.baseUrl + "admin/deleteAlumn/" + idAlumn, {headers:this.htppOptions});
  }



}
