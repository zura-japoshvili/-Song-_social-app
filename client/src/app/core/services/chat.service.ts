import { getConvInt } from './../interfaces/getConvInt';
import { Observable } from 'rxjs';
import { messageInt } from './../interfaces/messageInt';
import { newConvInt } from './../interfaces/newConvInt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import {IoUserInt} from "../interfaces/ioUserInt";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }

  public socket = io('ws://localhost:8900');

  public addUser(userId: string): Observable<IoUserInt[]>{
    this.socket.emit("addUser", userId);

    // return this.socket.on("getUsers", (data: IoUserInt[]) => {
    //   return data
    // })
    return new Observable((observer) => {
      this.socket.on("getUsers", (data: IoUserInt[]) => {
        observer.next(data)
      })
    })

  }

  public socketMessage(message: messageInt, receiverId: string){
    console.log('gaeshva')
    this.socket.emit('sendMessage', {
        senderId: message.senderId,
        receiverId: receiverId,
        text: message.text
      });
    // return new Observable((observer) => {
    //   this.socket.on('getMessage', (data: messageInt) => {
    //     observer.next(data);
    //   });
    // });

  }



  // this.socket.on("getUsers", users => {
  //   console.log(users);
  // })



  public getNewMessage(): Observable<messageInt>{
    console.log(3123123);
    return new Observable((observer) => {
      this.socket.on("sendMessage", (data: messageInt) => {
        console.log(data, '13123123124124124124124124fdasfafasf');
        observer.next(data)
      })
    })
  };



  getConversations(userId: string): Observable<getConvInt[]>{
    return this.http.get<getConvInt[]>("http://localhost:8800/api/conversations/"+ userId);
  }
  newConversation(data: newConvInt): Observable<getConvInt>{
    return this.http.post<getConvInt>("http://localhost:8800/api/conversations/", data);
  }
  findConv(firstUserId: string, secondUserId: string): Observable<getConvInt>{
    return this.http.get<getConvInt>(`http://localhost:8800/api/conversations/find/${firstUserId}/${secondUserId}`)
  }


  newMessage(message: messageInt, receiverId: string){
    return this.http.post<messageInt>("http://localhost:8800/api/messages/", message).subscribe((value) => {
      this.socketMessage(message, receiverId)
    })
  }
  getUserMessage(convesationId: string): Observable<messageInt[]>{
    return this.http.get<messageInt []>("http://localhost:8800/api/messages/" + convesationId);
  }


}
