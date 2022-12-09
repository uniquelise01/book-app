import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bookclub } from '../bookclub.model';
import { BookclubService } from '../bookclub.service';

@Component({
  selector: 'app-bookclub-edit',
  templateUrl: './bookclub-edit.component.html',
  styleUrls: ['./bookclub-edit.component.css']
})
export class BookclubEditComponent implements OnInit {
  originalContact: Bookclub;
  contact: Bookclub;
  editMode: boolean = false;
  id: string;

  constructor(
    private bookclubService: BookclubService,
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

        this.bookclubService.getContact(this.id)
          .subscribe(bookclubData => {
            this.originalContact = bookclubData.bookclub;

            if (!this.originalContact){
              return;
            }
            this.editMode = true;
            this.contact = JSON.parse(JSON.stringify(this.originalContact));
          });
      })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Bookclub('', '', value.name, value.phone, value.imageUrl, []);

    if (this.editMode) {
      this.bookclubService.updateContact(this.originalContact, newContact);
    } else {
      this.bookclubService.addContact(newContact);
    }

    this.router.navigate(['/bookclub'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['/bookclub'], {relativeTo: this.route});
  }

}
