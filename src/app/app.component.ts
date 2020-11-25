import { FavoriteChangeEventArgs } from './favorite/favorite.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'study';
  // make the favorite component to re-usable components
  post = {
    title: "Title",
    isFavorite: true
  };

  onFavoriteChange(eventArgs:FavoriteChangeEventArgs) {
    console.log("isFavorite changed to : ", eventArgs);
  }

  // exercise-Like Component
  tweet = {
    body: "Here is the body of a tweet...",
    isLiked: false,
    likeCount: 0
  }

}
