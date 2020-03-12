import { Injectable } from '@angular/core';
import {  Http, Response, RequestOptions, Headers } from '@angular/http';
//import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class AuthenticationServiceService {

  ApiProvider = "http://api.movie7s.com"
  //ApiProvider = "http://localhost:8000"
  //headers = new HttpHeaders;
  private _dbPromise: Promise<any>;
  constructor(private http: Http ,private rooter: Router) {
    /* this.headers = new HttpHeaders()
    .set("Content-Type", "application/json"); */
  }

  login(email: string, password: string): Promise<any> {
    return this._dbPromise = new Promise((resolve, reject) => {
      try {
        this.http.post(this.ApiProvider + '/login', { email: email, password: password })
        .map(response => response.json())
          .subscribe((res) => {
            /* console.log(res['message']['role'])
            console.log(res) */
            if (res['api_token'] != '') {
              if (res['message']['role'] == '9') {
                this.rooter.navigate(['/'])
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('api_token', JSON.stringify(res['api_token']));
                resolve(res)
              }
            }
          });
      } catch (err) {
        reject({ err: err });
      }
    });
  }

/*   logout() {
    const headers = new HttpHeaders()
      .set("api_token", this.getCurrentUser());
    return this.http.delete('xqx', { headers }).subscribe((res) => {
      if (res['statue'] = 'ok') {

        // remove user from local storage to log user out
        localStorage.removeItem('api_token');

      }
    })
  } */

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('api_token'));
  }

  loggedIn():boolean{
    /* console.log(this.getCurrentUser()) */
    if(this.getCurrentUser() != null){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    localStorage.removeItem('api_token')
  }

  /*  saveCurrentUser(user: User) {
       const currentUser = JSON.parse(localStorage.getItem('currentUser'));
       currentUser.user = user;
       localStorage.setItem('currentUser', JSON.stringify(currentUser));
   } */

  /*  forgotPassword(email: string) {
       return this.api.post('/password/email', {email: email});
   } */

  /* resetPassword(data: any) {
      return this.api.post('/password/reset', data);
  } */
  getUser(page) {
    let txt = this.ApiProvider + '/userslist/' + page;
    //console.log(txt)
    return this.http.get(txt).map(response => response.json());
  }
  getUserById(id) {
    let txt = this.ApiProvider + '/users/' + id;
    //console.log(txt)
    return this.http.get(txt);
  }
  UpdateUser(data) {
    console.log("_____________________patch_______________________________________________");
    let url = this.ApiProvider + '/users/' + data.id;
    return this.http.patch(url, data);
  }
  deleteUser(id){
    console.log("_____________________DELETE_______________________________________________");
    let url = this.ApiProvider + '/users/' + id;
    return this.http.delete(url);
  }
}
