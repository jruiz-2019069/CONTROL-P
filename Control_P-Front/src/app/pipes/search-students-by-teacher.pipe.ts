import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchStudentsByTeacher'
})
export class SearchStudentsByTeacherPipe implements PipeTransform {

  transform(students:any, search:any) {
    if(search == undefined){
      return students;
    }else{
      return students.filter((student: any) => {
        return student.name.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
