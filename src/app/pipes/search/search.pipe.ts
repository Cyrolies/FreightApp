import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchFields: string[], searchTerms: string): any[] {

    // No items to search for.
    if (!items || !items.length) { return []; }

    searchTerms = (searchTerms || '').trim();
    // No value to search for.
    if (!searchTerms) { return items; }

    // No fields to search in.
    if (!searchFields) { return items; }

    searchFields = searchFields.filter((sf) => {
      return items[0].hasOwnProperty(sf);
    });

    // No valid fields to search in.
    if (!searchFields.length) { return items; }

    searchTerms = searchTerms.toLowerCase();

    const filteredItems = items.filter( it => 
      searchFields.some(sf => {
        return (it[sf].toString() || '').toLowerCase().includes(searchTerms);
      })
    );

    return filteredItems;
  }

}
