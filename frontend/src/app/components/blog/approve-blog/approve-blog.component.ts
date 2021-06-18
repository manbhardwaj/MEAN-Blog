import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-approve-blog',
  templateUrl: './approve-blog.component.html',
  styleUrls: ['./approve-blog.component.css']
})
export class ApproveBlogComponent implements OnInit {

  username: any;
  blogPosts: any;
  blogId: any;

  constructor(
    private authService: AuthService,
    private blogService: BlogService
  ) { }

  // Function to get all blogs from the database
  getAllBlogs() {
    // Function to GET all blogs from database
    this.blogService.getAllBlogsAdmin().subscribe((data: any) => {
      this.blogPosts = data.blogs; // Assign array to use in HTML
    });
  }

  approveBlog(id) {
    this.blogService.approveBLog(id).subscribe(data => {
      this.getAllBlogs(); // Refresh blogs
    });
  }

  disapproveBlog(id) {
    this.blogService.disapproveBlog(id).subscribe(data => {
      this.getAllBlogs(); // Refresh blogs
    });
  }

  ngOnInit(): void {
    // Get profile username on page load
    this.authService.getProfile().subscribe((profile: any) => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
    });

    this.getAllBlogs(); // Get all blogs on component load
  }

}
