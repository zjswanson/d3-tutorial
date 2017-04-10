import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'D3 Practice!';
  data: any = [5,10,15,20,25];
  data2D: any
  // = [
  //               [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
  //               [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
  //               [600, 150]
  //             ]
              ;

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
