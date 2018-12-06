import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import { catchError } from '../../../node_modules/rxjs/operators';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Request:\n${JSON.stringify(req)}`);

        return next.handle(req)
          .pipe(catchError(error => {
            console.log(`Intercepted HTTP error (${JSON.stringify(new Date())}):`);
            console.log(`Error type: ${typeof error}.`);
            console.log(`Error body:\n${JSON.stringify(error)}`);
            console.log(`Request:\n${JSON.stringify(req)}`);
            // console.log(JSON.stringify(next));

            if (error instanceof HttpErrorResponse) {
                 console.log(`HTTP status: ${(<HttpErrorResponse>error).status}.`);
            }

            return Observable.throw(error); // Rethrow.
        }));
    }
}
