import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// export interface ValidationResponse {
//   success: string;
//   message: string;
// }

// export interface LoginResponse {
//   success: string;
//   message: string;
//   token: string;
//   user: any;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain = environment.domain;
  authToken: any;
  user: any;
  headers: any;

  constructor(private http: HttpClient) { }

  createAuthenticationHeaders() {
    this.loadToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('authorization', this.authToken);
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  // Function to register user accounts
  registerUser(user: any) {
    return this.http.post(this.domain + 'authentication/register', user);
  }

  // Function to check if username is taken
  checkUsername(username: string) {
    return this.http.get(this.domain + 'authentication/checkUsername/' + username);
  }

  // Function to check if e-mail is taken
  checkEmail(email: string) {
    return this.http.get(this.domain + 'authentication/checkEmail/' + email);
  }

  // Function to login user
  login(user: any) {
    return this.http.post(this.domain + 'authentication/login', user);
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  // Function to store user's data in client local storage
  storeUserData(token: string, user: any) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    localStorage.setItem('isAdmin', user.isAdmin);
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  // Function to get user's profile data
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'authentication/profile', { headers: this.headers });
  }

  // Function to get public profile data
  getPublicProfile(username: string) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'authentication/publicProfile/' + username, { headers: this.headers });
  }

  loggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isUserAdmin() {
    if (localStorage.getItem('token') && localStorage.getItem('isAdmin')) {
      return true;
    }
    return false;
  }

}
