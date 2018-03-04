import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DiscordClientService } from '../discord-client.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent{

  messages = [];
  maxMessages = 100;

  constructor(private client: DiscordClientService, private change: ChangeDetectorRef) { }

  ngOnInit() {
    this.client.on('message', message => {
      this.messages.push(message);
      if (this.messages.length > this.maxMessages) this.messages.shift();
      this.change.detectChanges();
    });
  }

}
