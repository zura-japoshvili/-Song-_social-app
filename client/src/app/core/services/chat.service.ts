import { getConvInt } from './../interfaces/getConvInt';
import { Observable } from 'rxjs';
import { messageInt } from './../interfaces/messageInt';
import { newConvInt } from './../interfaces/newConvInt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getConversations(userId: string): Observable<getConvInt[]>{
    return this.http.get<getConvInt[]>("http://localhost:8800/api/conversations/"+ userId);
  }
  newConversation(data: newConvInt){
    this.http.post("http://localhost:8800/api/conversations/", data);
  }

  newMessage(message: messageInt){
    this.http.post("http://localhost:8800/api/messages/", message).subscribe((value) => {
      console.log(value);
      
    })
  }
  getUserMessage(convesationId: string): Observable<messageInt[]>{
    return this.http.get<messageInt []>("http://localhost:8800/api/messages/" + convesationId);
  }
}
