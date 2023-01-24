import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatawithcomponentService } from 'src/app/services/datawithcomponent.service';
import { GetarticleService } from 'src/app/services/getarticle.service';
import { Artticle } from '../interfaces/article';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss'],
})
export class UpdateArticleComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  oneArticleValue!: Artticle;
  public currentId!: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private articleService: GetarticleService,
    private dataWithCompobebtService: DatawithcomponentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.dataWithCompobebtService.getOneArticle
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.currentId = data._id;
        this.form.patchValue(data);
      });
  }
  private initForm(): FormGroup {
    return (this.form = new FormGroup({
      link: new FormControl(''),
      title: new FormControl(''),
      categories: new FormControl(''),
      content: new FormControl(''),
      contentSnippet: new FormControl(''),
      creator: new FormControl(''),
      guid: new FormControl(''),
      isoDate: new FormControl(''),
      pubDate: new FormControl(''),
    }));
  }
  public updatearticle() {
    this.articleService.updateArticle(this.currentId, this.form.value).subscribe(data=>{
      if(data){
        window.alert("Article updated")
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
