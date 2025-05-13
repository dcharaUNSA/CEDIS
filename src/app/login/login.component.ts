import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [] // Remove the styleUrls property
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loading = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, 1000);
  }

   handleGuestLogin() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, 1000);
  }
}




