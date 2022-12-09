import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private subscription: Subscription;
  term: string;
  librarySelected = true;

  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.getLibrary();

    this.subscription = this.libraryService.libraryListChangedEvent.subscribe(
      (libraryList: Book[]) => {
        this.books = libraryList;
      }
    )
  }

  search(value: string){
    this.term = value;
  }

  onSelectLibrary(){
    this.librarySelected = true;
    
  }

  onSelectReadingList(){
    this.librarySelected = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
