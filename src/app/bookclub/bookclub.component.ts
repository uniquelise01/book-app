import { Component, OnInit } from '@angular/core';
import { Bookclub } from './bookclub.model';
import { BookclubService } from './bookclub.service';

@Component({
  selector: 'app-bookclub',
  templateUrl: './bookclub.component.html',
  styleUrls: ['./bookclub.component.css']
})
export class BookclubComponent implements OnInit {
  selectedContact: Bookclub;

  constructor(private bookclubService: BookclubService) { }

  ngOnInit(): void {
    this.bookclubService.bookclubSelectedEvent.subscribe(
      (contact: Bookclub) => {
        this.selectedContact = contact;
      }
    )
  }

}
