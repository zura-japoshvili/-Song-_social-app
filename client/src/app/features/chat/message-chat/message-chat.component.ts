import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {conversationInt} from "../../../core/interfaces/conversationInt";
import {messageInt} from "../../../core/interfaces/messageInt";
import {FormControl, Validators} from "@angular/forms";
import {ChatService} from "../../../core/services/chat.service";
import { faSearch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrls: ['./message-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageChatComponent implements OnInit {
  @Input() openChatInfo!: conversationInt;
  @Input() currentUserId!: string;
  @Input() messages!: messageInt[]

  public faPaperPlane = faPaperPlane;


  public messageInput = new FormControl<string>("", Validators.required);

  constructor(private _chatService: ChatService,
              private _change: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._chatService.getNewMessage().subscribe((value) => {
      this.messages.push(value);
      this._change.markForCheck()
    })
  }


  sendMessage(){
    this._chatService.newMessage({
        conversationId: this.openChatInfo.conversationId,
        senderId: this.currentUserId,
        text: this.messageInput.value
      },
      this.openChatInfo.conversationId
    )
    }

}
