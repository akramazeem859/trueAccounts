import { level3 } from './../../Models/COA/level3.model';
import { Pipe, PipeTransform } from '@angular/core';
import { level2 } from 'src/app/Models/COA/level2.model';

@Pipe({
  name: 'coaFilter'
})
export class CoaFilterPipe implements PipeTransform {

  transform(lvl:any[],filterstring:string,propName:string):any[] {
    
    const resultArray = [];
    if(lvl.length === 0 || filterstring === '' || propName ===''){
      return lvl;
    }
    for(const item of lvl){
      if(item[propName]===filterstring){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
