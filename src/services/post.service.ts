import { BadInputError } from '../app/common/bad-input-error';
import { NotFoundError } from './../app/common/not-found-error';
import { AppError } from './../app/common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class PostService {
  private url = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .pipe(
        catchError((error: Response) => {
          if (error.status === 404) 
            return throwError(new BadInputError(error.json()));
          return throwError(new AppError(error.json()));
        })
      );
  }

  updatePost(post) {
    return this.http.put(this.url + "/" + post.id, JSON.stringify(post));
  }

  deletePost(id) {
    return this.http.delete(this.url + "/" + id)
      .pipe(
        catchError((error: Response) => {
          if (error.status === 404)
            return throwError(new NotFoundError)

          return throwError(new AppError(error.json()));
        })
      );
  }

}
