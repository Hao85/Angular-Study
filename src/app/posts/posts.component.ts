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
      .subscribe(
        (response: any[]) => {
          this.posts = response
        });
  }

  createPost(input: HTMLInputElement) {
    let post = {title: input.value};
    input.value = "";
    this.service.create(post)
      .subscribe(
        (response) => {
          post["id"] = response["id"]; 
          this.posts.splice(0, 0, post);
        },
        (error: AppError) => {
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
    post["title"] = "UPDATE!!!";
    this.service.update(post)
      .subscribe(
        (response) => {
          console.log(response)
        });     
  } 

  deletePost(post) {
    this.service.delete(post.id)
      .subscribe(
        (response) => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            this.toastr.error("This post has been already deleted.")
          } else throw error;
        }
      )
  }
}
