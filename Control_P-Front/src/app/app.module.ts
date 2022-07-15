import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarLoginComponent } from './components/nav-bar-login/nav-bar-login.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GroupComponent } from './components/group/group.component';
import { StudentsComponent } from './components/students/students.component';
import { FormsModule } from '@angular/forms';
import { NavBarLoginRestService } from './services/login-rest.service';
import { HttpClientModule } from '@angular/common/http';
import { SupervisorsComponent } from './components/supervisors/supervisors.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { GroupsTeacherComponent } from './components/groups-teacher/groups-teacher.component';
import { StudentsByGroupComponent } from './components/students-by-group/students-by-group.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { StudentComponent } from './components/student/student.component';
import { GroupStudentComponent } from './components/group-student/group-student.component';
import { PractitionersComponent } from './components/practitioners/practitioners.component';
import { ReportsStudentComponent } from './components/reports-student/reports-student.component';
import { ProfileStudentComponent } from './components/profile-student/profile-student.component';
import { ProfileSupervisorComponent } from './components/profile-supervisor/profile-supervisor.component';
import { ProfileTeacherComponent } from './components/profile-teacher/profile-teacher.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { GradesGraphicComponent } from './components/grades-graphic/grades-graphic.component';
import { SearchGroupPipe } from './pipes/search-group.pipe';
import { SearchStudentsByTeacherPipe } from './pipes/search-students-by-teacher.pipe';
import { SearchPractitionerPipe } from './pipes/search-practitioner.pipe';
import { SearchSupervisorPipe } from './pipes/search-supervisor.pipe';
import { SearchTeacherPipe } from './pipes/search-teacher.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarLoginComponent,
    HomeComponent,
    NavBarComponent,
    GroupComponent,
    StudentsComponent,
    SupervisorsComponent,
    TeachersComponent,
    GroupsTeacherComponent,
    StudentsByGroupComponent,
    CreateStudentComponent,
    StudentComponent,
    GroupStudentComponent,
    PractitionersComponent,
    ReportsStudentComponent,
    ProfileStudentComponent,
    ProfileSupervisorComponent,
    ProfileTeacherComponent,
    GradesGraphicComponent,
    SearchGroupPipe,
    SearchStudentsByTeacherPipe,
    SearchPractitionerPipe,
    SearchSupervisorPipe,
    SearchTeacherPipe,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    NavBarLoginRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
