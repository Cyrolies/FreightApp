import { UserData } from './user-data';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import { catchError } from '../../../node_modules/rxjs/operators';
import { environment } from '../../environments/environment';
import { Events } from '../../../node_modules/@ionic/angular';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(private events: Events,
        private userData: UserData) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Request:\n${JSON.stringify(req)}`);

        if (environment.useOAuth) {
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${environment.defaultOAuthToken}` // Todo: get token from authorization service.
                }
              });
        }

        return next.handle(req)
          .pipe(catchError(error => {


            console.log(`Intercepted HTTP error (${JSON.stringify(new Date())}):`);
            console.log(`Error type: ${typeof error}.`);
            console.log(`Error body:\n${JSON.stringify(error)}`);
            console.log(`Request:\n${JSON.stringify(req)}`);
            // console.log(JSON.stringify(next));

            if (error instanceof HttpErrorResponse) {
                const res = <HttpErrorResponse>error;
                console.log(`HTTP status: ${res.status}.`);

                if (res.status === 401 || res.status === 403) {

                    this.userData.isLoggedIn().then(currentlyLoggedIn => {
                        if (currentlyLoggedIn) {
                            // handle authorization errors by navigating to login:
                            console.log('Error_Token_Expired.');
                            this.events.publish('user:logout');

                            // localStorage.removeItem('token');
                        }
                        // Else: probably detected failed login attempt on Login Page.
                    });
                }
            }

            return Observable.throw(error); // Rethrow.
        }));
    }
}
