import { ErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(private toastr: ToastrService) {
        
    }

    handleError(error: any) {
        /* 
        Turn on onActivateTick in the error handler
        to ensure that the toast is running inside Angular's zone
        */
        this.toastr.error("An unexpected error occurred.",  null, { onActivateTick: true });
            /*
            for real application, 
            please put the error into your logAPI
            3rd libray: log4js
            */
            console.log(error);
    }
}