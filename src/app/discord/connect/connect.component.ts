import { Component, OnInit } from '@angular/core';
import { DiscordClientService } from '../discord-client.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  
  constructor(private client: DiscordClientService) { }

  lastAttemptInvalid = false;
  token;

  ngOnInit() {
    this.token = localStorage.getItem('token') || this.token
    if (this.token) this.submit();
  }

  submit() {
    this.client.connect(this.token).then(
      () => {
        this.lastAttemptInvalid = false;
        localStorage.setItem('token', this.token);
      },
      () => this.lastAttemptInvalid = true
    );
  }

}
