import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, toArray } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JsondataService {

  APIUrl = "https://localhost:44363/api/Observation/"
  constructor(private _http: HttpClient) {

  }

  public getJsonData() {
    return this._http.get(this.APIUrl+"ReadJson");
  }

  public addNewJsonData(data: any) {
    return this._http.post(this.APIUrl + "AddJsonData", data);
  }

  public updateData(id: string, data: any) {
    return this._http.put(this.APIUrl + "UpdateDataItem/" + id, data);
  }
}