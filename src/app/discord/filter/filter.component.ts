import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DiscordClientService } from '../discord-client.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  constructor(private client: DiscordClientService) { }

  Object = Object;

  operatorOptions;
  valueOptions;
  selected;

  @Input()
  filter;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
 
  update() {
    this.change.emit(this.filter);
    this.operatorOptions = this.client.filterInfo[this.filter.field].op;
  }

  removeValue(loc) {
    this.filter.values.splice(loc, 1);
    this.update();
  }

  addValue(val) {
    this.filter.values.push(this.selected);
    this.update();
  }

  changeField() {
    this.refreshValueOptions();
    this.filter.values = [];
    this.selected = undefined;
    this.filter.op = undefined;
    this.update();
  }

  changeOp() {
    this.update();
  }

  refreshValueOptions() {
    this.valueOptions = this.client.filterInfo[this.filter.field].values;
  }

}
