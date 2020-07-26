import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        //if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    //Authorization: `Bearer ${currentUser.token}`,
                    "Access-Control-Allow-Origin": "https://10c1e391.eu-gb.apigw.appdomain.cloud",
                    "Access-Control-Allow-Methods": "POST, GET, DELETE, PUT",
                    "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
                    "Access-Control-Max-Age": "86400"
                }
            });
        //}
        console.log("request = "+request);
        return next.handle(request);
    }
}
