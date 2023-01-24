import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.initForm();
  }
  public initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login() {
    this.loginService
      .Login(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (!data) {
          window.alert('You ate loginned as:' + data);
        } else {
          window.alert('You ate loginned');
        }
      });
    this.form.reset();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
