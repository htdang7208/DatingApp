import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Message } from 'src/app/_models/message';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm', { static: true }) messageForm: NgForm;
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }
  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      // .pipe(
      //   tab((messages) => {
      //     for (const message of messages) {
      //       if (message.isRead === false && message.recipientId === currentUserId) {
      //         this.userService.markAsRead(currentUserId, message.id);
      //       }
      //     }
      //   })
      // )
      .subscribe(
        (messages) => this.messages = messages,
        (error) => this.alertify.error(error)
      );
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
        },
        (error) => this.alertify.error(error)
      );
  }
}
