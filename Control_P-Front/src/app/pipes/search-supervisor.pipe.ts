import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSupervisor'
})
export class SearchSupervisorPipe implements PipeTransform {

  transform(supervisors:any, search:any) {
    if(search == undefined){
      return supervisors;
    }else{
      return supervisors.filter((supervisor: any) => {
        return supervisor.name.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
