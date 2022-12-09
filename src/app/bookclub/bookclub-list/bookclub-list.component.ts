import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bookclub } from '../bookclub.model';
import { BookclubService } from '../bookclub.service';

@Component({
  selector: 'app-bookclub-list',
  templateUrl: './bookclub-list.component.html',
  styleUrls: ['./bookclub-list.component.css']
})
export class BookclubListComponent implements OnInit, OnDestroy {
  contacts: Bookclub[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private bookclubService: BookclubService) { }

  ngOnInit(): void {
    this.bookclubService.getContacts();

    this.subscription = this.bookclubService.bookclubListChangedEvent.subscribe(
      (contactsList: Bookclub[]) => {
        this.contacts = contactsList;
      }
    )
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
