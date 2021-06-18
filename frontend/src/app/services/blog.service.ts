import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  domain = this.authService.domain;
  headers: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();

    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', this.authService.authToken);
  }

  // Function to create a new blog post
  newBlog(blog: any) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'blogs/newBlog', blog, { headers: this.headers });
  }

  // Function to get all blogs from the database
  getAllBlogs() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/allBlogs', { headers: this.headers });
  }

  // Function to get all the blogs waiting for approval
  getAllBlogsAdmin() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/admin/allBlogs', { headers: this.headers });
  }

  // Function to get the blog using the id
  getSingleBlog(id: string) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/singleBlog/' + id, { headers: this.headers });
  }

  // Function to edit/update blog post
  editBlog(blog: any) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'blogs/updateBlog/', blog, { headers: this.headers });
  }

  // Function to delete a blog
  deleteBlog(id: string) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, { headers: this.headers });
  }

  // Function to like a blog post
  likeBlog(id: any) {
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/likeBlog/', blogData, { headers: this.headers });
  }

  // Function to dislike a blog post
  dislikeBlog(id: any) {
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/dislikeBlog/', blogData, { headers: this.headers });
  }

  // Function to dislike a blog post
  approveBLog(id: any) {
    const blogData = { _id: id };
    return this.http.put(this.domain + 'blogs/approveBlog/', blogData, { headers: this.headers });
  }

  // Function to dislike a blog post
  disapproveBlog(id: any) {
    const blogData = { _id: id, rejectionReason: "Bhai kuch acha likh liya kr." };
    return this.http.put(this.domain + 'blogs/disApproveBlog/', blogData, { headers: this.headers });
  }

  // Function to post a comment on a blog post
  postComment(id: any, comment: any) {
    this.createAuthenticationHeaders(); // Create headers
    // Create blogData to pass to backend
    const blogData = {
      id: id,
      comment: comment
    }
    return this.http.post(this.domain + 'blogs/comment', blogData, { headers: this.headers });

  }


}
