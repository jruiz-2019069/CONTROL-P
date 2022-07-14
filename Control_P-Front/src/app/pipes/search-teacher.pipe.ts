import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTeacher'
})
export class SearchTeacherPipe implements PipeTransform {

  transform(teachers:any, search:any) {
    if(search == undefined){
      return teachers;
    }else{
      return teachers.filter((teacher: any) => {
        return teacher.name.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
