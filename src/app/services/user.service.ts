import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userName: string = 'Eybert Macedo'; // This will be replaced with actual user data from backend
  private userRole: string = 'Bibliotecario'; // This will be replaced with actual user role from backend

  constructor() { }

  getUserName(): string {
    return this.userName;
  }

  setUserName(name: string): void {
    this.userName = name;
  }

  getUserRole(): string {
    return this.userRole;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }
} 