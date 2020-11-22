import { AuthorService } from './../author.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authors;

  constructor(service: AuthorService) {
    this.authors = service.getAuthors();
   }

  ngOnInit() {
  }

}
