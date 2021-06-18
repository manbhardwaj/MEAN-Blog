import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './components/blog/blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { BlogService } from './services/blog.service';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowBlogComponent } from './components/blog/show-blog/show-blog.component';
import { ApproveBlogComponent } from './components/blog/approve-blog/approve-blog.component';
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    BlogComponent,
    DeleteBlogComponent,
    EditBlogComponent,
    HomeComponent,
    ShowBlogComponent,
    ApproveBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    SocialLoginModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '708185568557-u1r97vf6adk811l8hi0h9mnn79skr2ov.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }, AuthService, AuthGuard, NotAuthGuard, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
