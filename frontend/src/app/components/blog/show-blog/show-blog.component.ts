import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.css']
})
export class ShowBlogComponent implements OnInit {
  currentUrl: any;
  blog: any;
  username: any;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // Function to get all blogs from the database
  getBlogDetails() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Get blog details for the selected blog using Blog Service
    this.blogService.getAllBlogs().subscribe((data: any) => {
      this.blog = data.blogs.filter(x => x._id == this.currentUrl.id)[0];
    });
  }

  // Function to like a blog post
  likeBlog(id) {
    // Service to like a blog post
    this.blogService.likeBlog(id).subscribe(data => {
      this.getBlogDetails(); // Refresh blogs after like
    });
  }

  // Function to disliked a blog post
  dislikeBlog(id) {
    // Service to dislike a blog post
    this.blogService.dislikeBlog(id).subscribe(data => {
      this.getBlogDetails(); // Refresh blogs after dislike
    });
  }

  ngOnInit(): void {
    // Get username of the current user from the Auth service
    this.authService.getProfile().subscribe((profile: any) => {
      this.username = profile.user.username;
    });

    this.getBlogDetails();
  }

}
