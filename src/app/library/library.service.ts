import { Injectable, EventEmitter } from '@angular/core';
import { Book } from './book.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class LibraryService {
    books: Book[] = [];
    librarySelectedEvent = new EventEmitter<Book>();
    libraryChangedEvent = new EventEmitter<Book[]>();
    libraryListChangedEvent = new Subject<Book[]>();
    maxLibraryId: number;

    constructor(private http: HttpClient){
        this.maxLibraryId = this.getMaxId();
    }

    sortAndSend() {
      this.books.sort((a, b) => a.title > b.title ? 1 : b.title > a.title ? -1 : 0);
      this.libraryListChangedEvent.next(this.books.slice());
    }

    getLibrary() {
        this.http
            .get<{ message: string, library: Book[]}>("http://localhost:3000/library/")
            .subscribe(
                (responseData) => {
                   this.books = responseData.library;
                   this.sortAndSend();
                },
                (error: any) => {
                   console.log(error);
                }
            );
    }
    
    getBook(id: string) {
      return this.http.get<{ message: string, book: Book }>('http://localhost:3000/library/' + id);
    }
    
    
    storeLibrary() {
        let books = JSON.stringify(this.books);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http
            .put('http://localhost:3000/library', books, {
                headers: headers,
            })
            .subscribe(() => {
                this.libraryListChangedEvent.next(this.books.slice());
            }
            )
    }
    
    deleteBook(book: Book) {

        if (!book) {
          return;
        }
    
        const pos = this.books.findIndex(d => d.id === book.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/library/' + book.id)
          .subscribe(
            (response: Response) => {
              this.books.splice(pos, 1);
              this.sortAndSend();
            }
          );
    }

    getMaxId(): number {
        let maxId = 0;
    
        this.books.forEach(book => {
            const currentId = parseInt(book.id);
            if (currentId > maxId){
                maxId = currentId;
            }
        })
        return maxId;
    }

    addBook(book: Book) {
        if (!book) {
          return;
        }
    
        book.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        this.http.post<{ message: string, book: Book }>('http://localhost:3000/library',
          book,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new document to documents
              this.books.push(responseData.book);
              this.sortAndSend();
            }
          );
    }

    updateBook(originalBook: Book, newBook: Book) {
        if (!originalBook || !newBook) {
          return;
        }
    
        const pos = this.books.findIndex(d => d.id === originalBook.id);
    
        if (pos < 0) {
          return;
        }
    
        newBook.id = originalBook.id;
        newBook._id = originalBook._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/library/' + originalBook.id,
          newBook, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.books[pos] = newBook;
              this.sortAndSend();
            }
          );
      }
}