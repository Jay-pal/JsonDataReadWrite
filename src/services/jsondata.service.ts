import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, toArray } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JsondataService {

  url = "http://localhost:3000/Datas/"
  constructor(private _http: HttpClient) {

  }


  public getJsonData() {
    return this._http.get(this.url);
  }

  public addNewJsonData(data: any) {
    return this._http.post(this.url, data);
  }

  public updateData(id: string, data: any) {
    return this._http.put(this.url + id, data);
  }

  // APIUrl = "https://localhost:44363/api/Observation/"

  // public getJsonData() {
  //   return this._http.get(this.APIUrl+"GetObservations");
  // }

  // public addNewJsonData(data: any) {
  //   return this._http.post(this.APIUrl + "AddDataItem", data);
  // }

  // public updateData(id: string, data: any) {
  //   return this._http.put(this.APIUrl + "UpdateDataItem/" + id, data);
  // }
}