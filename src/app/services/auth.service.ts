import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth:boolean=false
  private readonly adminCredentials = {
    email: "admin@admin.com",
    password: "admin"
  };
  constructor() { }

  signIn(email: string, password: string): boolean {
    if (email === this.adminCredentials.email && password === this.adminCredentials.password) {
      this.isAuth = true;
      return true;
    }
    return false;
  }

  signOut(){
    this.isAuth=false
  }

  isAuthenticated():boolean{
    return this.isAuth
  }
}
