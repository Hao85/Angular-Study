import { BadInputError } from '../app/common/bad-input-error';
import { NotFoundError } from './../app/common/not-found-error';
import { AppError } from './../app/common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class DataService {

    constructor(private url: string, private http: HttpClient) { }

    getAll() {
        return this.http.get(this.url)
            .pipe(catchError(this.errorHandler));
    }

    create(resource) {
        return this.http.post(this.url, JSON.stringify(resource))
            .pipe(catchError(this.errorHandler));
    }

    update(resource) {
        return this.http.put(this.url + "/" + resource.id, JSON.stringify(resource))
            .pipe(catchError(this.errorHandler));
    }

    delete(id) {
        return this.http.delete(this.url + "/" + id)
            .pipe(catchError(this.errorHandler));
    }


    private errorHandler(error : Response) {
        if (error.status === 404)
            return throwError(new NotFoundError);

        if (error.status === 404) 
            return throwError(new BadInputError(error.json()));

        return throwError(new AppError(error.json()));
    }

}
