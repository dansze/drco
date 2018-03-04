import { Injectable } from '@angular/core';
import { Client } from 'discord.js';

@Injectable()
export class DiscordClientService {

  private client;
  private consumers = {
   message: [] 
  };
  public user;
  public filterableUsers = [];
  public filters = [];

  public filterInfo = {
    guild: {
      op: ['in', 'not in'],
      values: [],
      valueName: guild => guild.name
    },
    channel: {
      op: ['in', 'not in'],
      values: [],
      valueName: channel => channel.name ? `${channel.guild? channel.guild.name : 'DM' }#${channel.name}` : `DM#${channel.recipient.username}`
    },
    author: {
      op: ['in', 'not in'],
      values: this.filterableUsers,
      valueName: user => user.tag
    },
    'mentions': {
      op: ['has one of', 'only has', 'does not have'],
      values: this.filterableUsers,
      valueName: user => user.tag
    }
  }

  private filterTemplate = {
    'in': (field, vals) => {
      return message => {
        return vals.some( val => message[field].id === val.id);
      }
    },
    'not in': (field, vals) => {
      return message => {
        return !vals.some( val => message[field].id === val.id);
      }
    },
    'has one of': (field, vals) => {
      return message => {
        return vals.some( val => {
          return message[field].users.some( user => {
            return user.id == val.id;
          });
        });
      }
    },
    'does not have': (field, vals) => {
      return message => {
        return !vals.some( val => {
          return message[field].users.some( user => {
            return user.id == val.id;
          });
        });
      }
    },
    'only has': (field, vals) => {
      return message => {
        return vals.every( val => {
          return message[field].users.some( user => {
            return user.id == val.id;
          });
        });
      }
    }

  }

  constructor() {
    this.client = new Client();
    
    let filter = (message)=>{
      if (this.filters.every(filter => {
        return filter(message);
      })) {
        this.consumers.message.forEach(fn => fn(message));
      }
    }

    this.client.on('message', filter);
    this.client.on('messageUpdate', filter)
  }

  connect(token) {
    return this.client.login(token).then(()=>{
      this.user = this.client.user;

      this.filterInfo.guild.values = this.client.guilds.array();
      this.filterInfo.channel.values = this.client.channels.filterArray( channel => channel.type != 'voice');
      this.filterableUsers.push(this.client.user);
    });
  }

  buildFilters(filters) {
    this.filters = [];
    filters.forEach( filter => {
      this.filters.push(this.filterTemplate[filter.op](filter.field, filter.values));
    });
  }

  on(event, fn) {
    this.consumers[event].push(fn);
  }
}
