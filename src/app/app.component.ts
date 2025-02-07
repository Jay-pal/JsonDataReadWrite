import { NgContentAst } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JsondataService } from 'src/services/jsondata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'angularproject';
  data: any;
  constructor(private _jsonService: JsondataService) {
  }

 
}
