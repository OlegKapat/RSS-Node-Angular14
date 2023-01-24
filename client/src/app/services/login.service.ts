import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Login } from '../components/article/interfaces/login';
import { environment } from 'src/environments/environment';
import { Login_Methods } from '../components/article/constants/constants';

@Injectable()
export class LoginService {
  private token='';
  constructor(private http: HttpClient) {}
  Login(login: Login): Observable<Login> {
    const API_URL = `${environment.loginURL}/${Login_Methods.login_url}`;
    return this.http.post<Login>(API_URL, login).pipe(tap(({token})=>{
      this.setToken(token);
    }));
  }
  setToken(token:string){
    this.token=token;
 }
 getToken():string {
  return this.token;
}
isAuthenticated():boolean{
 return !!this.token
}
}
