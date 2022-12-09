import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { LibraryItemComponent } from './library/library-item/library-item.component';
import { ReadingListItemComponent } from './library/reading-list-item/reading-list-item.component';
import { BookclubItemComponent } from './bookclub/bookclub-item/bookclub-item.component';
import { WishlistItemComponent } from './wishlist/wishlist-item/wishlist-item.component';
import { LibraryListComponent } from './library/library-list/library-list.component';
import { LibraryFilterPipe } from './library/library-filter.pipe';
import { BookclubFilterPipe } from './bookclub/bookclub-filter.pipe';
import { FormsModule } from '@angular/forms';
import { BookclubListComponent } from './bookclub/bookclub-list/bookclub-list.component';
import { WishlistListComponent } from './wishlist/wishlist-list/wishlist-list.component';
import { WishlistFilterPipe } from './wishlist/wishlist-filter.pipe';

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
    LibraryEditComponent,
    HeaderComponent,
    LibraryItemComponent,
    ReadingListItemComponent,
    BookclubItemComponent,
    WishlistItemComponent,
    LibraryListComponent,
    LibraryFilterPipe,
    BookclubListComponent,
    BookclubFilterPipe,
    WishlistListComponent,
    WishlistFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
