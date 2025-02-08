import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsondataService } from 'src/services/jsondata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data:any;
  constructor(private _jsonService: JsondataService, private router: Router) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    this._jsonService.getJsonData().subscribe({
      next: (res:any) => {
        this.data = Array.isArray(res.datas) ? res.datas : []; 
      },
      error: (err) => {
        alert("There is some problem while fetching the details...");
      }
    })
  }

  getPropertyValue(properties: any[], label: string) {
    const property = properties.find(p => p.label === label);
    return property ? property.value : '-';
  }



  addNewData() {
    this.router.navigate(['add-data']);
  }

  editData(id: string) {
    this.router.navigate(['edit-data'], {
      queryParams: {
        id: id
      }
    });
  }
}
