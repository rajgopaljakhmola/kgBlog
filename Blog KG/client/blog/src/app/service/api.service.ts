import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = 'http://localhost:3000/addPost'
  constructor(private http: HttpClient) { }
  postBlog(data:any){
    return this.http.post<any>(`${this.host}`,data);
  }
}
