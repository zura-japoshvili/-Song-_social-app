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
  public message$: BehaviorSubject<messageInt | null> = new BehaviorSubject<messageInt| null>(null!);
  constructor(private http: HttpClient) { }

  public socket = io('ws://localhost:8900');

  public addUser(userId: string){    
    this.socket.emit("addUser", userId);
  }
  


  // this.socket.on("getUsers", users => {
  //   console.log(users);
  // }) 

  

  public getNewMessage = () => {

    
    this.socket.on("getMessage", (data) => {
      console.log(12312312312);
      this.message$.next(data);
      
    })
    
    return this.message$.asObservable();
  };



  getConversations(userId: string): Observable<getConvInt[]>{
    return this.http.get<getConvInt[]>("http://localhost:8800/api/conversations/"+ userId);
  }
  newConversation(data: newConvInt){
    this.http.post("http://localhost:8800/api/conversations/", data);
  }

  newMessage(message: messageInt, receiverId: string): Observable<messageInt>{
    return this.http.post<messageInt>("http://localhost:8800/api/messages/", message).pipe((value) => {
      this.socket.emit('sendMessage', {
        senderId: message.senderId,
        receiverId: receiverId,
        text: message.text
      });
      return value
    })
  }
  getUserMessage(convesationId: string): Observable<messageInt[]>{
    return this.http.get<messageInt []>("http://localhost:8800/api/messages/" + convesationId);
  }
}
