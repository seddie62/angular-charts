import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  APIEndpoint = environment.APIEndpoint
  APIKey = environment.APIKey


  constructor(private http:HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  getChartData() {
    return this.http.get(`${this.APIEndpoint}/data/2.5/forecast?id=524901&APPID=${this.APIKey}&lat=35&lon=139`);
  }
}
