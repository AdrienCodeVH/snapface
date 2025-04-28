import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor() {}

  getToken(): string | null {
    return this.token;
  }

  login(): void {
    this.token = 'MyToken';
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }
}
