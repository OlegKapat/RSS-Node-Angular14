import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_Methods } from '../components/article/constants/constants';
import { Artticle } from '../components/article/interfaces/article';

@Injectable()
export class GetarticleService {

  constructor( private http: HttpClient) { }

  getArticle(params:any={}):Observable<Artticle[]>{
    const API_URL = `${environment.articleURL}/${API_Methods.get_article}`;
    return this.http.get<Artticle[]>(API_URL,{
      params:new HttpParams({
        fromObject:params
      })
    })
  }
  getFilteredArticle(params:any={}):Observable<Artticle[]>{
    const API_URL = `${environment.articleURL}/${API_Methods.get_filteredarticle}`;
    return this.http.get<Artticle[]>(API_URL,{
      params:new HttpParams({
        fromObject:params
      })
    })
  }
  createArticle(article:Artticle):Observable<Artticle>{
    const API_URL = `${environment.articleURL}/${API_Methods.create_article}`;
    return this.http.post<Artticle>(API_URL,article)
  }
  updateArticle(id:string,article:Artticle):Observable<Artticle>{
    const API_URL = `${environment.articleURL}/${API_Methods.update_article}/${id}`;
    return this.http.patch<Artticle>(API_URL,article)
  }
  deleteArticle(id:string):Observable<any>{
    const API_URL = `${environment.articleURL}/${API_Methods.delete_article}/${id}`;
    return this.http.delete<any>(API_URL)
  }

}
