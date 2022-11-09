import { getConvInt } from './../interfaces/getConvInt';
import { Observable } from 'rxjs';
import { messageInt } from './../interfaces/messageInt';
import { newConvInt } from './../interfaces/newConvInt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private http: HttpClient) { }

  socket = io('ws://localhost:8900');

  public addUser(userId: string){
    console.log(userId);
    
    this.socket.emit("addUser", userId);
    this.socket.on("getUsers", users => {
      console.log(users);
    }) 
  }


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
