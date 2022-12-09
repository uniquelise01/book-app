import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Wishlist } from '../wishlist.model';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.component.html',
  styleUrls: ['./wishlist-detail.component.css']
})
export class WishlistDetailComponent implements OnInit {
  @Input() wishlistItem: Wishlist;
  id: string;
  nativeWindow: any;

  constructor(
    private wishlistService: WishlistService,
    private router: Router,
    private route: ActivatedRoute,
    windRefService: WindRefService) { 
      this.nativeWindow = windRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.wishlistService.getWishlistItem(this.id)
            .subscribe(wishlistData => {
              this.wishlistItem = wishlistData.wishlist;
            });
        }
      );
  }

  onDelete() {
    this.wishlistService.deleteWishlistItem(this.wishlistItem);
    this.router.navigate(['wishlist']);
  }

  onView() {
    if (this.wishlistItem.link) {
      this.nativeWindow.open(this.wishlistItem.link);
    }
  }

}
