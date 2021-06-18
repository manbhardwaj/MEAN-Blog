import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blog: any;
  processing = false;
  currentUrl: any;
  loading = true;

  constructor(
    private _snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // Function to Submit Update
  updateBlogSubmit() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.blogService.editBlog(this.blog).subscribe((data: any) => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.openSnackBar(data.message, "Ok");
        this.processing = false; // Unlock form fields
      } else {
        this.openSnackBar(data.message, "Ok");
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/blog']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.blogService.getSingleBlog(this.activatedRoute.snapshot.params.id).subscribe((data: any) => {
      this.blog = data.blog;
    })
  }

}
