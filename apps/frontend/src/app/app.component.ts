import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions, LocalStorageJwtService, selectLoggedIn, selectUser } from '@realworld/auth/data-access';
import { filter, take } from 'rxjs/operators';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'cdt-root',
  standalone: true,

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FooterComponent, NavbarComponent, RouterModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  user$ = this.store.select(selectUser);
  isLoggedIn$ = this.store.select(selectLoggedIn);

  constructor(private readonly store: Store, private readonly localStorageJwtService: LocalStorageJwtService) {}

  ngOnInit() {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter((token) => !!token),
      )
      .subscribe(() => this.store.dispatch(authActions.getUser()));
  }
}
// Before sending data to the backend, process the tags string
const tagsString = this.articleForm.value.tags || '';
const tagList = tagsString
  .split(',')
  .map(tag => tag.trim())
  .filter(tag => tag.length > 0);

const articlePayload = {
  ...this.articleForm.value,
  tagList
};

this.articleService.createArticle(articlePayload).subscribe({
  next: (article) => {
    this.router.navigate(['/article', article.slug]);
  },
  error: (err) => {
    console.error('Error creating article:', err);
  }
});

