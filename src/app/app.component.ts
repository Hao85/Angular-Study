import { FavoriteChangeEventArgs } from './favorite/favorite.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'study';
  post = {
    title: "Title",
    isFavorite: true
  };

  onFavoriteChange(eventArgs:FavoriteChangeEventArgs) {
    console.log("isFavorite changed to : ", eventArgs);
  }
}
