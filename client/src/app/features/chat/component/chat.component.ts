import { FormControl, Validators } from '@angular/forms';
import { messageInt } from './../../../core/interfaces/messageInt';
import { conversationInt } from './../../../core/interfaces/conversationInt';
import { UserService } from './../../../core/services/user.service';
import { userDataInt } from './../../../core/interfaces/userDataInt';
import { getConvInt } from './../../../core/interfaces/getConvInt';
import { combineLatest, forkJoin, map, Observable, tap } from 'rxjs';
import { ChatService } from './../../../core/services/chat.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faSearch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  constructor(private _chatService: ChatService,
    private _userService: UserService,
    private _change: ChangeDetectorRef) { }

  // FontAwesome Icons
  public faSearch = faSearch;
  public faPaperPlane = faPaperPlane;
  

  user: userDataInt = JSON.parse(localStorage.getItem('User')!);
  currentUserId = this.user._id;
  public data!: conversationInt[]
  public messages!: messageInt[]
  public openChatInfo!: conversationInt
  public messageList: string[] = [];

  public messageInput = new FormControl<string>("", Validators.required);

  ngOnInit(): void { 

    this._chatService.addUser(this.currentUserId);
    this._chatService.addUser('63613b90c7f18ca0d1cf5d7d')
    forkJoin({
      conversations: this._chatService.getConversations(this.currentUserId),
      users: this._userService.getAllUsers(),
    }).pipe(map((value) => {
      
      let convUsers: any  = []
      value.conversations.forEach((param, index) => {
        if(param.members[0] !== this.currentUserId){
          convUsers.push( {
            conversationId: param._id, 
            user: value.users.find(value => value._id === param.members[0])
          })
        }else{
          convUsers.push( {
            conversationId: param._id, 
            user: value.users.find(value => value._id === param.members[1])
          })
        }
      })
      return convUsers
    })).subscribe((value: conversationInt[]) => {    
      console.log(value);
        
      this.data = value;
      this._change.markForCheck();
    })
  }
  
  openConv(data: conversationInt){
    this.openChatInfo = data;
    this._chatService.getUserMessage(data.conversationId).subscribe((value) => {
      this.messages = value;
      this._change.markForCheck();   
    })
  }

  sendMessage(){
    this._chatService.newMessage({
      conversationId: this.openChatInfo.conversationId, 
      senderId: this.currentUserId, 
      text: this.messageInput.value
    })    
  }
}
