import { Pipe, PipeTransform } from '@angular/core';
import { Bookclub } from './bookclub.model';

@Pipe({
  name: 'bookclubFilter'
})
export class BookclubFilterPipe implements PipeTransform {

  transform(contacts: Bookclub[], term: string): any {
    let filteredContacts: Bookclub[] =[];  
    if (term && term.length > 0) {
        filteredContacts = contacts.filter(
          (contact:Bookclub) => contact.name.toLowerCase().includes(term.toLowerCase())
        );
    }
    if (filteredContacts.length < 1){
        return contacts;
    }
    return filteredContacts;
    }

}
