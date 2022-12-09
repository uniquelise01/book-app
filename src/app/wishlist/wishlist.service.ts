import { Injectable, EventEmitter } from '@angular/core';
import { Wishlist } from './wishlist.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class WishlistService {
    wishlist: Wishlist[] = [];
    wishlistSelectedEvent = new EventEmitter<Wishlist>();
    wishlistChangedEvent = new EventEmitter<Wishlist[]>();
    wishlistListChangedEvent = new Subject<Wishlist[]>();
    maxWishlistId: number;

    constructor(private http: HttpClient){
        this.maxWishlistId = this.getMaxId();
    }

    sortAndSend() {
      this.wishlistListChangedEvent.next(this.wishlist.slice());
    }

    getWishlist() {
        this.http
            .get<{ message: string, wishlist: Wishlist[]}>("http://localhost:3000/wishlist/")
            .subscribe(
                (responseData) => {
                   this.wishlist = responseData.wishlist;
                   this.sortAndSend();
                },
                (error: any) => {
                   console.log(error);
                }
            );
    }
    
    getWishlistItem(id: string) {
      return this.http.get<{ message: string, wishlist: Wishlist }>('http://localhost:3000/wishlist/' + id);
    }
    
    
    storeWishlist() {
        let wishlist = JSON.stringify(this.wishlist);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http
            .put('http://localhost:3000/wishlist', wishlist, {
                headers: headers,
            })
            .subscribe(() => {
                this.wishlistListChangedEvent.next(this.wishlist.slice());
            }
            )
    }
    
    deleteWishlistItem(wishlist: Wishlist) {

        if (!wishlist) {
          return;
        }
    
        const pos = this.wishlist.findIndex(d => d.id === wishlist.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/wishlist/' + wishlist.id)
          .subscribe(
            (response: Response) => {
              this.wishlist.splice(pos, 1);
              this.sortAndSend();
            }
          );
    }

    getMaxId(): number {
        let maxId = 0;
    
        this.wishlist.forEach(wishlistItem => {
            const currentId = parseInt(wishlistItem.id);
            if (currentId > maxId){
                maxId = currentId;
            }
        })
        return maxId;
    }

    addWishlistItem(wishlist: Wishlist) {
        if (!wishlist) {
          return;
        }
    
        wishlist.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        this.http.post<{ message: string, wishlist: Wishlist }>('http://localhost:3000/wishlist',
          wishlist,
          { headers: headers })
          .subscribe(
            (responseData) => {
              this.wishlist.push(responseData.wishlist);
              this.sortAndSend();
            }
          );
    }

    updateWishlistItem(originalWishlistItem: Wishlist, newWishlistItem: Wishlist) {
        if (!originalWishlistItem || !newWishlistItem) {
          return;
        }
    
        const pos = this.wishlist.findIndex(d => d.id === originalWishlistItem.id);
    
        if (pos < 0) {
          return;
        }
    
        newWishlistItem.id = originalWishlistItem.id;
        newWishlistItem._id = originalWishlistItem._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/wishlist/' + originalWishlistItem.id,
        newWishlistItem, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.wishlist[pos] = newWishlistItem;
              this.sortAndSend();
            }
          );
      }
}