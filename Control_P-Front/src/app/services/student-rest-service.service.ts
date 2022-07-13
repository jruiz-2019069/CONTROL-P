import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StudentRestServiceService {

  htppOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  constructor(
    public navBarRest: NavBarLoginRestService,
    private http: HttpClient
  ) { }

  getReports(idAlumn:any){
    return this.http.get(environment.baseUrl + "alumn/getReports/" + idAlumn, {headers:this.htppOptions});
  }

  createReport(idAlumn:any, params:{}){
    return this.http.post(environment.baseUrl + "alumn/createReport/" + idAlumn, params, {headers:this.htppOptions});
  }

  getGroup(idGroup:any){
    return this.http.get(environment.baseUrl + "alumn/getGroup/" + idGroup, {headers:this.htppOptions});
  }

  getProfile(idAlumn:any){
    return this.http.get(environment.baseUrl + "alumn/getProfile/" + idAlumn, {headers:this.htppOptions});
  }

  updateProfile(idAlumn:any, params:{}){
    return this.http.put(environment.baseUrl + "alumn/updateProfileAlumn/" + idAlumn, params, {headers:this.htppOptions});
  }

  getGrades(idAlumn:any){
    return this.http.get(environment.baseUrl + "alumn/getQualification/" + idAlumn, {headers:this.htppOptions});
  }

}
