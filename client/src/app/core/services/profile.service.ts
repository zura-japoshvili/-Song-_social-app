import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public uploadImg(img: FormData): Observable<string>{
    return this.http.post<string>("http://localhost:8800/api/upload/", img);
  }
}
