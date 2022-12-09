import { Component, Input, OnInit } from '@angular/core';
import { Wishlist } from '../wishlist.model';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit {
  @Input() wishlistItem: Wishlist;

  constructor() { }

  ngOnInit(): void {
  }

}
