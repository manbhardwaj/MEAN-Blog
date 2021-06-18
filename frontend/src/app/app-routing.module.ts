import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveBlogComponent } from './components/blog/approve-blog/approve-blog.component';
import { BlogComponent } from './components/blog/blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { ShowBlogComponent } from './components/blog/show-blog/show-blog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent // Default Route
  },
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'blog',
    component: BlogComponent, // Blog Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'approve-blogs',
    component: ApproveBlogComponent, // Blog Route,
    canActivate: [AdminGuard] // User must be logged in to view this route
  },
  {
    path: 'show-blog/:id',
    component: ShowBlogComponent, // Edit Blog Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'edit-blog/:id',
    component: EditBlogComponent, // Edit Blog Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'delete-blog/:id',
    component: DeleteBlogComponent, // Delete Blog Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
