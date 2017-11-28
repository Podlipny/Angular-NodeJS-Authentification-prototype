import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
  isAuthenticated = false;
  TOKEN_KEY = 'token';

  constructor( private http: HttpClient) {}
}
