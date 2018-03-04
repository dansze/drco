import { Component, OnInit } from '@angular/core';
import { DiscordClientService } from '../discord-client.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  constructor(private client: DiscordClientService) {}

  filters = [];

  addFilter() {
    this.filters.push({
      field: undefined,
      values: [],
      op: undefined
    });
  }

  removeFilter(loc) {
    this.filters.splice(loc, 1);
    this.updateFilter();
  }

  updateFilter() {
    if(this.filters.every( filter => {
      return filter.field && filter.op && filter.values.length > 0;
    })) {
      this.client.buildFilters(this.filters);
    }
  }
}
