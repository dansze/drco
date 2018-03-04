import { TestBed, inject } from '@angular/core/testing';

import { DiscordClientService } from './discord-client.service';

describe('DiscordClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscordClientService]
    });
  });

  it('should be created', inject([DiscordClientService], (service: DiscordClientService) => {
    expect(service).toBeTruthy();
  }));
});
