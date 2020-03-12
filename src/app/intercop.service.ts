import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthenticationServiceService } from 'app/authentication-service.service';

@Injectable()
export class IntercopService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            let v =localStorage.getItem('api_token').valueOf().slice(1,localStorage.getItem('api_token').valueOf().length-1)
            const changedReq = req.clone({headers: req.headers.set('api_token', v)});
            return next.handle(changedReq);
        
    }
}