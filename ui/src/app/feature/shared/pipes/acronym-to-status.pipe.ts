import { Pipe, PipeTransform, ElementRef} from '@angular/core';

@Pipe({
  name: 'acronymToStatus'
})
export class AcronymToStatusPipe implements PipeTransform {

  public readonly ACRONYM = {
    PE: 'Pending',
    CO: 'Completed',
    RE: 'Rejected',
    CA: 'Cancelled',
  }
  transform(value: string | undefined = ''): string | undefined {
    if(this.ACRONYM.hasOwnProperty(value)){
      return this.ACRONYM[value as keyof typeof this.ACRONYM]
    }
    return undefined;


  }

}
