import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public uploadImg(img: FormData){
    return this.http.post("http://localhost:8800/api/upload/", img)
  }
}
