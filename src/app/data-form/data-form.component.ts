import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  @Input() data: any;
  @Output() sendData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  saveData() {
    let test =
    this.data.map(function(entry) {
      return parseInt(entry);
    });
    this.data = test;
    this.sendData.emit(this.data);
  }
}
