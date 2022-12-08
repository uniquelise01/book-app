import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.model';

@Pipe({
  name: 'libraryFilter'
})
export class LibraryFilterPipe implements PipeTransform {

  transform(books: Book[], term: string): any {
    let filteredBooks: Book[] =[];  
    if (term && term.length > 0) {
        filteredBooks = books.filter(
          (book:Book) => book.title.toLowerCase().includes(term.toLowerCase())
        );
    }
    if (filteredBooks.length < 1){
        return books;
    }
    return filteredBooks;
    }

}
