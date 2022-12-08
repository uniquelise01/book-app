import { Component, Input, OnInit } from '@angular/core';
import { Bookclub } from '../bookclub.model';

@Component({
  selector: 'app-bookclub-item',
  templateUrl: './bookclub-item.component.html',
  styleUrls: ['./bookclub-item.component.css']
})
export class BookclubItemComponent implements OnInit {
  @Input() contact: Bookclub;

  constructor() { }

  ngOnInit(): void {
  }

}
