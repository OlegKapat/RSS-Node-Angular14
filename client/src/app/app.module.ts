import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { GetarticleService } from './services/getarticle.service';
import { UpdateArticleComponent } from './components/article/update-article/update-article.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { PagenotfoundComponent } from './components//article/pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatearticleComponent } from './components/article/createarticle/createarticle.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { TokenInterceptor } from './shared/interseptors/tokeninteseptor';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    ArticleComponent,
    UpdateArticleComponent,
    PagenotfoundComponent,
    CreatearticleComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    GetarticleService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
  ],
})
export class AppModule {}
