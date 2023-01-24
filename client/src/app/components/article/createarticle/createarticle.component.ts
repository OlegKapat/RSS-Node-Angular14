import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GetarticleService } from 'src/app/services/getarticle.service';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.scss'],
})
export class CreatearticleComponent implements OnInit,OnDestroy {
 public form!: FormGroup;
 destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private articleService:GetarticleService) {}

  ngOnInit(): void {
    this.initForm()
  }
  private initForm(): FormGroup {
    return (this.form = new FormGroup({
      link: new FormControl(''),
      title: new FormControl(''),
      categories: new FormControl(''),
      content: new FormControl(''),
      contentSnippet: new FormControl(''),
      creator: new FormControl(''),
      guid: new FormControl(this.generateGuid()),
      isoDate: new FormControl(''),
      pubDate: new FormControl(''),
    }));
  }
  public addarticle(){
    this.articleService.createArticle(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(data=>{
      if(data){
        window.alert("Article saved")
      }
    })
  }

  generateGuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
