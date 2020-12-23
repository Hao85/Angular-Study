import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor( private http: HttpClient) {
  }

  getOrders() {
    let token = localStorage.getItem("token");
    let authorization = "Bearer " + token;
    let headers = new HttpHeaders({ Authorization: authorization })

    return this.http.get("/api/orders", { headers: headers })
      .pipe(map(response => response));
  }
}
