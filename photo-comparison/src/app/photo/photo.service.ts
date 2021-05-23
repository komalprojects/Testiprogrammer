import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photodata='https://jsonplaceholder.typicode.com/photos';
  constructor(private http: HttpClient) { }
  
  getdata():Observable<any[]>
  {
    return this.http.get<any[]>(this.photodata)
  }
  postdata(input:any):Observable<any[]>
  {
    return this.http.post<any[]>(this.photodata,input)
  }
  getelementdata(id:any){
    return this.http.get<any[]>(`${this.photodata}/${id}`)
  }
}
