import { BadInputError } from '../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  
  constructor(private service: PostService, private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe((posts: any[]) => this.posts= posts);
  }

  createPost(input: HTMLInputElement) {
    let post = {title: input.value};
    this.posts.splice(0, 0, post);

    input.value = "";
    
    this.service.create(post)
      .subscribe(
        (newPost) => post["id"] = newPost["id"], 
        (error: AppError) => {
          this.posts.splice(0, 1);

          if (error instanceof BadInputError) {
            /* 
            for real application, 
            you can put error into form to display to users,
            like below: 
            */
            // this.form.setErrors(error.orignalError);
          } else throw error;
        }
      );
  }

  updatePost(post) {
    const orignialTitle = post["title"];
    post["title"] = "UPDATE!!!";

    this.service.update(post)
      .subscribe(
        (updatedPost) => console.log(updatedPost),
        (error: AppError) => {
          post["title"] = orignialTitle;

          throw error;
        }
      );     
  } 

  deletePost(post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
        () =>{},
        (error: AppError) => {
          this.posts.splice(index, 0, post)

          if (error instanceof NotFoundError) {
            this.toastr.error("This post has been already deleted.")
          } else throw error;
        }
      )
  }
}
