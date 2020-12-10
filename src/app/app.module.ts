import { GithubFollowersService } from './../services/github-followers.service';
import { AppErrorHandler } from './common/app-error-handler';
import { PostService } from './../services/post.service';
import { HttpClientModule } from '@angular/common/http'
import { AuthorService } from './author.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { TitleCaseComponent } from './title-case/title-case.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from './title-case.pipe';
import { LikeComponent } from './like/like.component';
import { InputFormatDirective } from './input-format.directive';
import { ZippyComponent } from './zippy/zippy.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { TopicsComponent } from './topics/topics.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PostsComponent } from './posts/posts.component';
import { BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    FavoriteComponent,
    TitleCaseComponent,
    TitleCasePipe,
    LikeComponent,
    InputFormatDirective,
    ZippyComponent,
    CourseFormComponent,
    SignupFormComponent,
    TopicsComponent,
    ChangePasswordComponent,
    PostsComponent,
    GithubFollowersComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    GithubProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthorService,
    PostService,
    GithubFollowersService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
