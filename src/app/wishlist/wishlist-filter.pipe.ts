import { Pipe, PipeTransform } from '@angular/core';
import { Wishlist } from './wishlist.model';

@Pipe({
  name: 'wishlistFilter'
})
export class WishlistFilterPipe implements PipeTransform {

  transform(wishlist: Wishlist[], term: string): any {
    let filteredBooks: Wishlist[] =[];  
    if (term && term.length > 0) {
        filteredBooks = wishlist.filter(
          (wishlist:Wishlist) => wishlist.title.toLowerCase().includes(term.toLowerCase())
        );
    }
    if (filteredBooks.length < 1){
        return wishlist;
    }
    return filteredBooks;
    }

}
