import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BookclubComponent } from './bookclub/bookclub.component';
import { LibraryComponent } from './library/library.component';
import { BookclubDetailComponent } from './bookclub/bookclub-detail/bookclub-detail.component';
import { BookclubEditComponent } from './bookclub/bookclub-edit/bookclub-edit.component';
import { WishlistDetailComponent } from './wishlist/wishlist-detail/wishlist-detail.component';
import { WishlistEditComponent } from './wishlist/wishlist-edit/wishlist-edit.component';
import { LibraryDetailComponent } from './library/library-detail/library-detail.component';
import { LibraryEditComponent } from './library/library-edit/library-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    WishlistComponent,
    BookclubComponent,
    LibraryComponent,
    BookclubDetailComponent,
    BookclubEditComponent,
    WishlistDetailComponent,
    WishlistEditComponent,
    LibraryDetailComponent,
    LibraryEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
