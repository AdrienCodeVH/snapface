import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'MyToken';

  constructor() {}

  getToken() {
    return this.token;
  }
}
