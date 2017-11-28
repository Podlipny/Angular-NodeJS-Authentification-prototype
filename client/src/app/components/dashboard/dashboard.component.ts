import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAuthenticated = this.authService.isAuthenticated;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  setLogin() {
    if (this.authService.isAuthenticated)
      this.isAuthenticated = this.authService.isAuthenticated = false;
    else
      this.isAuthenticated = this.authService.isAuthenticated = true;
  }
}
