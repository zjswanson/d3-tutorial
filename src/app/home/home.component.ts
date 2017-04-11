import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'D3 Practice!';
  data: any = [5,10,15,20,25];
  data2D: any

  ngOnInit() {
    var dataset = [];
    var numDataPoints = 50;
    var xRange = Math.random() * 1000;
    var yRange = Math.random() * 1000;
    for (var i = 0; i < numDataPoints; i++) {
        var newNumber1 = Math.round(Math.random() * xRange);
        var newNumber2 = Math.round(Math.random() * yRange);
        dataset.push([newNumber1, newNumber2]);
    }
    this.data2D = dataset;
  }

  saveData(data) {
    this.data = data;
  }
}
