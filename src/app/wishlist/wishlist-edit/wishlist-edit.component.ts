import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Wishlist } from '../wishlist.model';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-edit',
  templateUrl: './wishlist-edit.component.html',
  styleUrls: ['./wishlist-edit.component.css']
})
export class WishlistEditComponent implements OnInit {
  originalWishlistItem: Wishlist;
  wishlistItem: Wishlist;
  editMode: boolean = false;
  id: string;

  constructor(
    private wishlistService: WishlistService,
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

        this.wishlistService.getWishlistItem(this.id)
          .subscribe(wishlistData => {
            this.originalWishlistItem = wishlistData.wishlist;

            if (!this.originalWishlistItem){
              return;
            }

            this.editMode = true;
            this.wishlistItem = JSON.parse(JSON.stringify(this.originalWishlistItem));
          });
      })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newWishlistItem = new Wishlist( '', '', value.title, value.author, value.imageUrl, value.link);
    if (this.editMode) {
      this.wishlistService.updateWishlistItem(this.originalWishlistItem, newWishlistItem);
    } else {
      this.wishlistService.addWishlistItem(newWishlistItem);
    }

    this.router.navigate(['/wishlist'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['/wishlist'], {relativeTo: this.route});
  }

}
