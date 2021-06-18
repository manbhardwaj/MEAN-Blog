import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(
    private _snackBar: MatSnackBar,
    public authService: AuthService,
    private router: Router,
  ) { }

  // Function to logout user
  onLogoutClick() {
    setTimeout(() => {
      this.authService.logout(); // Logout user
      this.router.navigate(['/']).then(() => {
        this._snackBar.open("Logged out successfully", "Ok", {
          duration: 2000,
        })
      }); // Navigate back to home page
    }, 500);
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((data: any) => {
      this.user = data.user;
    })
  }

}
