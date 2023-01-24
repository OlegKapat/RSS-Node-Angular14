import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Artticle } from './interfaces/article';
import { GetarticleService } from '../../services/getarticle.service';
import { Router } from '@angular/router';

import { finalize, Subject, takeUntil } from 'rxjs';
import { DatawithcomponentService } from 'src/app/services/datawithcomponent.service';
import { Filter_Array } from './constants/constants';
import { range } from 'src/app/shared/utils/utils';

const limit = 10;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  public allarticle: Artticle[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public activeRoute: boolean = true;
  public pageNumber: number=1;
  public limit = limit;
  public articleLength!: number;
  public currentId!: string;
  public activeIndex!: number;
  public params!: {};
  public arr!: number[];
  public filter = Filter_Array;
  public find!:number | string;
  public sort!: string;

  constructor(
    private articleService: GetarticleService,
    private router: Router,
    private dataWithCompobebtService: DatawithcomponentService
  ) {}

  ngOnInit(): void {
    this.getAllArtcicle();
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        if (event) {
          this.activeRoute = event.url == '/article' ? true : false;
          this.currentId = event?.url?.split('/')[3] || '';
        }
      });
  }
 
  getAllArtcicle() {
    this.params = Object.assign(
      {},
      {
        pageNumber: this.pageNumber,
        limit: this.limit,
        sort: this.sort,
        find: this.find,
      }
    );
    
    this.articleService
      .getArticle(this.params)
      .pipe(
        finalize(
          () =>
            (this.arr = range(
              this.pageNumber,
              Math.floor(this.articleLength / limit)
            ))
        )
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.allarticle = data.artfromdb;
        this.articleLength = data.totalArticle;
      });
  }

  public sendData() {
    let filteredArticle = this.allarticle.find(
      (article) => article['_id'] == this.currentId
    );
    this.dataWithCompobebtService.sendForUpdate(filteredArticle);
  }
  delete(id: string) {
    this.articleService
      .deleteArticle(id)
      .pipe(
        finalize(() => {
          this.getAllArtcicle();
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        window.alert('Article deleted');
      });
  }
  public onSelected(event: any) {
    this.sort = event.target.value;
  }

  public getFiltereData() {
    this.getAllArtcicle();
  }

  public loadMore(event: any) {
    const target = event.target as HTMLTextAreaElement;
    let step = target.value;
    this.pageNumber = 1;
    this.pageNumber += +step;

    this.getAllArtcicle();
  }
  public lastPage() {
    this.pageNumber += 1;
    this.getAllArtcicle();
  }
  public firstPage() {
    this.pageNumber -= 1;
    this.getAllArtcicle();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
