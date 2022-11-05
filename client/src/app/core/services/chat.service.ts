import { messageInt } from './../interfaces/messageInt';
import { newConvInt } from './../interfaces/newConvInt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getConversations(userId: string){
    this.http.get("http://localhost:8800/api/conversations/"+ userId);
  }
  newConversation(data: newConvInt){
    this.http.post("http://localhost:8800/api/conversations/", data);
  }

  newMessage(message: messageInt){
    this.http.post("http://localhost:8800/api/messages/", message);
  }
  getUserMessage(convesationId: string){
    this.http.get("http://localhost:8800/api/messages/" + convesationId);
  }
}
