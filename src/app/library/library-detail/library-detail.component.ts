import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { LibraryService } from '../library.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-library-detail',
  templateUrl: './library-detail.component.html',
  styleUrls: ['./library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
  book: Book;
  id: string;
  nativeWindow: any;

  constructor(
    private libraryService: LibraryService, 
    private router: Router, 
    private route: ActivatedRoute,
    windRefService: WindRefService) { 
      this.nativeWindow = windRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.libraryService.getBook(this.id)
            .subscribe(libraryData => {
              this.book = libraryData.library;
              console.log(libraryData);
            });
        }
      );
  }

  onDelete() {
    this.libraryService.deleteBook(this.book);
    this.router.navigate(['library']);
  }

  onView() {
    if (this.book.link) {
      this.nativeWindow.open(this.book.link);
    }
  }

}
