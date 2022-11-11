import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output} from '@angular/core';
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
  @Output() openChatInfo!: conversationInt
  @Output() currentUserId!: string
  @Output() messages!: messageInt[]

  public faPaperPlane = faPaperPlane;


  public messageInput = new FormControl<string>("", Validators.required);

  constructor(private _chatService: ChatService,
              private _change: ChangeDetectorRef) { }

  ngOnInit(): void {
  }


  sendMessage(){
    this._chatService.newMessage({
        conversationId: this.openChatInfo.conversationId,
        senderId: this.currentUserId,
        text: this.messageInput.value
      },
      this.openChatInfo.user._id
    ).subscribe((value) => {
      this.messageInput.setValue('');
      this.messages.push(value);
      this._change.markForCheck();
    })
  }
}
