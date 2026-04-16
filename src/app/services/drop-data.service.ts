import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropDataService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('data.json')
  }
}
