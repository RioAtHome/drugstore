import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate'
})
export class StringToDatePipe implements PipeTransform {
  public static __DATEFORMAT = ['YY-MM-DD' , 'YY-MM', 'YY', 'YY-MM-DD'
  ]
  transform(value: string | undefined, dateFormat: string = 'YY-MM-DD'): string | undefined {
    return value?.split('T')[0] 
    
  }

}
