import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bookclub } from '../bookclub.model';
import { BookclubService } from '../bookclub.service';

@Component({
  selector: 'app-bookclub-detail',
  templateUrl: './bookclub-detail.component.html',
  styleUrls: ['./bookclub-detail.component.css']
})
export class BookclubDetailComponent implements OnInit {
  @Input() contact: Bookclub;
  id: string;

  constructor(
    private bookclubService: BookclubService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.bookclubService.getContact(this.id)
            .subscribe(contactData => {
              this.contact = contactData.contact;
            });
        }
      );
  }

  onDelete() {
    this.bookclubService.deleteContact(this.contact);
    this.router.navigate(['bookclub']);
  }

}
