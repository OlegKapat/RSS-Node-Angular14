import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  template:`<h1>Page Not Found`,
 styles:['h1 { font-weight: normal; color:black;margin-top:30% }']
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
