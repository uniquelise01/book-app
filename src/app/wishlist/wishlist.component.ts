import { Component, OnInit } from '@angular/core';
import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  selectedWishlist: Wishlist;

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.wishlistService.wishlistSelectedEvent.subscribe(
      (wishlist: Wishlist) => {
        this.selectedWishlist = wishlist;
      }
    )
  }

}
