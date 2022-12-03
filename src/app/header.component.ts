import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'book-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
