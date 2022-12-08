import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { LibraryService } from './library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  selectedBook: Book;
  
  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.librarySelectedEvent.subscribe(
      (book: Book) => {
        this.selectedBook = book;
      }
    )
  }

}
