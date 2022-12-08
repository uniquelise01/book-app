import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-library-edit',
  templateUrl: './library-edit.component.html',
  styleUrls: ['./library-edit.component.css']
})
export class LibraryEditComponent implements OnInit {
  originalBook: Book;
  book: Book;
  editMode: boolean = false;
  id: string;

  constructor(
    private libraryService: LibraryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) {
          this.editMode = false;
          return;
        }
        this.libraryService.getBook(this.id)
          .subscribe(bookData => {
            this.originalBook = bookData.library;
          });

        if (!this.originalBook){
          return;
        }
        this.editMode = true;
        this.book = JSON.parse(JSON.stringify(this.originalBook));
      })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newBook = new Book( '', '', value.title, value.author, value.imageUrl, value.link, value.published, false, []);
    if (this.editMode) {
      this.libraryService.updateBook(this.originalBook, newBook);
    } else {
      this.libraryService.addBook(newBook);
    }

    this.router.navigate(['/library'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['/library'], {relativeTo: this.route});
  }

}
