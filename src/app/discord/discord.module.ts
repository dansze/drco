import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscordClientService } from './discord-client.service';
import { ConnectComponent } from './connect/connect.component';
import { FiltersComponent } from './filters/filters.component';
import { FilterComponent } from './filter/filter.component';
import { SharedModule } from '../shared/shared.module';
import { DisplayComponent } from './display/display.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ConnectComponent, FiltersComponent, FilterComponent, DisplayComponent],
  providers: [DiscordClientService],
  exports: [
    ConnectComponent, FiltersComponent, DisplayComponent
  ]
})
export class DiscordModule { }
