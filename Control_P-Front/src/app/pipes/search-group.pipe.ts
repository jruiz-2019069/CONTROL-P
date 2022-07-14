import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchGroup'
})
export class SearchGroupPipe implements PipeTransform {

  transform(groups:any, search:any) {
    if(search == undefined){
      return groups;
    }else{
      return groups.filter((group: any) => {
        return group.code.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
