import { Pipe, PipeTransform } from '@angular/core';
import { Drug } from 'src/app/shared/models';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Drug[], searchText: string): Drug[] {
    if (!items) {
      return [];
    }

    if (!searchText){
      return items;
    }

    searchText = searchText.toLocaleLowerCase();

    return items.filter(({name}) => {
      return name.toLocaleLowerCase().includes(searchText);
    })
  }

}