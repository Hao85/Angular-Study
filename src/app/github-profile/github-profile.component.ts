import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    /* 
    if you do not need to render samae page,
    you can use snapshot
    */
    // let id = +this.route.snapshot.paramMap.get("id");
    // console.log("id: ", id);
    this.route.paramMap.subscribe((params) => {
      /*
      get id ,
      and get profile from the server
      */ 
      let id = +params.get("id");
      console.log("id: ", id);
    });
  }

  onSubmit() {
    this.router.navigate(
      [ "/followers"],
      {
        queryParams:{ 
          page: 1,
          order: "newest"
        }
      }
    );      
  }

}
