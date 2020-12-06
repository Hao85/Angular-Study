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
    this.service.getAllPosts()
      .subscribe(
        (response: any[]) => {
          this.posts = response
        },
        (error)=> {
          this.toastr.error("An unexpected error occurred.");
          /*
          for real application, 
          please put the error into your logAPI
          3rd libray: log4js
          */
          console.log(error);
        }
      );
  }

  createPost(input: HTMLInputElement) {
    let post = {title: input.value};
    input.value = "";
    this.service.createPost(post)
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
          } else {
            this.toastr.error("An unexpected error occurred.");
            /*
            for real application, 
            please put the error into your logAPI
            3rd libray: log4js
            */
            console.log(error);
          }
        }
      );
  }

  updatePost(post) {
    post["title"] = "UPDATE!!!";
    this.service.updatePost(post)
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {
          this.toastr.error("An unexpected error occurred.");
          /*
          for real application, 
          please put the error into your logAPI
          3rd libray: log4js
          */
          console.log(error);
        }
      ); 
    
  } 

  deletePost(post) {
    this.service.deletePost(post.id +"/200")
      .subscribe(
        (response) => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            this.toastr.error("This post has been already deleted.")
          } else {
            this.toastr.error("An unexpected error occurred.");
            /*
            for real application, 
            please put the error into your logAPI
            3rd libray: log4js
            */
            console.log(error);
          }
        }
      )
  }
}
