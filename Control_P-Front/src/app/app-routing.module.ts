import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { GradesGraphicComponent } from './components/grades-graphic/grades-graphic.component';
import { GroupStudentComponent } from './components/group-student/group-student.component';
import { GroupComponent } from './components/group/group.component';
import { GroupsTeacherComponent } from './components/groups-teacher/groups-teacher.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PractitionersComponent } from './components/practitioners/practitioners.component';
import { ProfileStudentComponent } from './components/profile-student/profile-student.component';
import { ProfileSupervisorComponent } from './components/profile-supervisor/profile-supervisor.component';
import { ProfileTeacherComponent } from './components/profile-teacher/profile-teacher.component';
import { ReportsStudentComponent } from './components/reports-student/reports-student.component';
import { StudentComponent } from './components/student/student.component';
import { StudentsByGroupComponent } from './components/students-by-group/students-by-group.component';
import { StudentsComponent } from './components/students/students.component';
import { SupervisorsComponent } from './components/supervisors/supervisors.component';
import { TeachersComponent } from './components/teachers/teachers.component';

const routes: Routes = [
  //GENERAL
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'group', component:GroupComponent},
  //ADMIN
  {path:'supervisor', component:SupervisorsComponent},
  {path:'teacher', component:TeachersComponent},
  {path:'students', component:StudentsComponent},
  //TEACHER
  {path:'groupsTeacher', component:GroupsTeacherComponent},
  {path:'studentsByGroup/:idGroup', component:StudentsByGroupComponent},
  {path:'createStudent', component:CreateStudentComponent},
  {path:'profileTeacher', component:ProfileTeacherComponent},
  //STUDENT
  {path:'student', component:StudentComponent},
  {path:'groupStudent', component:GroupStudentComponent},
  {path:'profileStudent', component:ProfileStudentComponent},

  //SUPERVISOR
  {path:'practitioners', component:PractitionersComponent},
  {path:'profileSupervisor', component:ProfileSupervisorComponent},

  //COMPARTIDAS
  {path:'reportsStudent/:idAlumn', component:ReportsStudentComponent},
  {path:'gradesGraphic/:idAlumn', component:GradesGraphicComponent},
  {path:'gradesGraphic', component:GradesGraphicComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
