import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { CreatearticleComponent } from './components/article/createarticle/createarticle.component';
import { UpdateArticleComponent } from './components/article/update-article/update-article.component';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { PagenotfoundComponent } from './components/article/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
  {
    path: 'article',
    component: ArticleComponent,
    children: [
      { path: 'create', component: CreatearticleComponent },
      { path: 'update/:id', component: UpdateArticleComponent },
    ],
  },

  { path: 'mainpage', component: MainpageComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
