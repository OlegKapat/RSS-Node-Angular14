import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Artticle } from '../components/article/interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class DatawithcomponentService {

  private sendDataAnotherComponent = new BehaviorSubject({});
  getOneArticle = this.sendDataAnotherComponent .asObservable();
  constructor() { }

  sendForUpdate(value?:Artticle | any) {
    this.sendDataAnotherComponent.next(value);
  }
}
