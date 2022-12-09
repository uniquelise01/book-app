import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Wishlist } from '../wishlist.model';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})
export class WishlistListComponent implements OnInit, OnDestroy {
  wishlist: Wishlist[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.wishlistService.getWishlist();

    this.subscription = this.wishlistService.wishlistListChangedEvent.subscribe(
      (wishlistList: Wishlist[]) => {
        this.wishlist = wishlistList;
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
