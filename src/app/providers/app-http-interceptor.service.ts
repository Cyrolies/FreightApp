import { ToastOptions } from '@ionic/core';
import { UserData } from './user-data';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { throwError } from 'rxjs';

import 'rxjs/add/operator/do';
import { catchError } from '../../../node_modules/rxjs/operators';
import { environment } from '../../environments/environment';
import { Events, ToastController } from '../../../node_modules/@ionic/angular';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(private events: Events,
        private userData: UserData,
        private toastCtrl: ToastController) {
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

            if (error instanceof HttpErrorResponse) {
                const res = <HttpErrorResponse>error;
                console.log(`HTTP status: ${res.status}.`);

                // Could use the following code to automatically log-out the user.
                //  (But this would likely produce a confusing UI experience for the user.)
                // Would use:
                //      if (res.status === 401 || res.status === 403) { // 401: Unauthenticated; 403: Unauthorized.
                //          this.userData.isLoggedIn().then(currentlyLoggedIn => {
                //              if (currentlyLoggedIn) {
                //                          console.log('Error_Token_Expired.');
                //                          this.events.publish('user:logout');
                //              }
                //          });
                //      }
                //
                // Rather just present an authorization alert:
                //  Place toast at the top of the screen, rather than at the default bottom position,
                //      so that it doesn't clash with another error toast that may be placed there by
                //      the page making the request.
                if (res.status === 401 || res.status === 403) { // 401: Unauthenticated; 403: Unauthorized.

                    this.userData.isLoggedIn().then(currentlyLoggedIn => {
                        if (currentlyLoggedIn) {

                            this.presentAuthorizationError();
                        }
                    });
                }
            }

            return throwError(error); // Rethrow.
        }));
    }

    async presentAuthorizationError() {

        const toast = await this.toastCtrl.create(
            {
                message: 'You don\'t seem to have permission to access this feature.' ,
                showCloseButton: true,
                position: 'top'
            }
          );
          
          await toast.present();

    }
    
}

