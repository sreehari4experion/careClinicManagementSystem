import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Staff } from '../class/staff';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  //loginverify
  public loginVerify(user: User) {
    return this.httpClient.get(
      environment.apiUrl + '/' + user.LoginId + '/' + user.Password

      // https://localhost:44381/sreehari/password
    );
    console.log('loginverify');
  }

  //logout
  public logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    localStorage.removeItem('accessRole');
    localStorage.removeItem('token');
    localStorage.removeItem('staffId')
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('accessRole');
    sessionStorage.removeItem('staffId');
  }
}
