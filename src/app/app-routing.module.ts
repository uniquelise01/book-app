import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { LibraryEditComponent } from './library/library-edit/library-edit.component';
import { LibraryDetailComponent } from './library/library-detail/library-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistEditComponent } from './wishlist/wishlist-edit/wishlist-edit.component';
import { WishlistDetailComponent } from './wishlist/wishlist-detail/wishlist-detail.component';
import { BookclubComponent } from './bookclub/bookclub.component';
import { BookclubEditComponent } from './bookclub/bookclub-edit/bookclub-edit.component';
import { BookclubDetailComponent } from './bookclub/bookclub-detail/bookclub-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/library', pathMatch: 'full'},
  { path: 'library', component: LibraryComponent, children: [
    { path: 'new', component: LibraryEditComponent },
    { path: ':id', component: LibraryDetailComponent },
    { path: ':id/edit', component: LibraryEditComponent }
  ] },
  { path: 'wishlist', component: WishlistComponent, children: [
    { path: 'new', component: WishlistEditComponent },
    { path: ':id', component: WishlistDetailComponent },
    { path: ':id/edit', component: WishlistEditComponent }
  ] },
  { path: 'bookclub', component: BookclubComponent, children: [
    { path: 'new', component: BookclubEditComponent },
    { path: ':id', component: BookclubDetailComponent },
    { path: ':id/edit', component: BookclubEditComponent }
  ] }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
