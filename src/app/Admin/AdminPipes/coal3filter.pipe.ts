import { Pipe, PipeTransform } from '@angular/core';
import { level3 } from 'src/app/Models/COA/level3.model';

@Pipe({
  name: 'coal3filter'
})
export class Coal3filterPipe implements PipeTransform {

  transform(lvl: level3[],filerstring:string,propName:string): any[] {
    const resultArray = [];
    if(lvl.length === 0 || filerstring === '' || propName ===''){
      return lvl;
    }
    for(const item of lvl){
      if(item[propName]===filerstring){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
