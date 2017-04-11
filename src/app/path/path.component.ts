import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { D3Service, D3, Selection,  } from 'd3-ng2-service';

import { coreData } from '../../../data';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private parentNativeElement: any;
  private globalSVG;
  private stationData;
  private width;
  private height;
  @Input() data: any;

  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
     this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
     this.parentNativeElement = element.nativeElement;
     this.stationData = coreData.maxBlueStations;
  }

  ngOnInit() {
    var w = 500,
        h = 500;
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    this.width = w - margin.left - margin.right;
    this.height = h - margin.top - margin.bottom;

    this.globalSVG = this.d3.select('body')
                            .append('svg')
                            .attr("width", this.width + margin.left + margin.right)
                            .attr("height", this.height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform",
                                  "translate(" + margin.left + "," + margin.top + ")");


    this.drawGraph();
  }

  drawGraph() {
    var d3 = this.d3;

    var lineData: number[][];
    var lineData2: number[][];

    lineData = [
      [0,0],
      [1,1],
      [2,4],
      [3,9]
    ];

    lineData2 = [
      [0,0],
      [1,1],
      [2,2],
      [3,3]
    ];

    lineData = [];
    lineData2 = [];
    for (var i = 0; i < 20; i++) {
      lineData.push([i, i*i]);
      lineData2.push([i, i]);
    }


    console.log(lineData);

    // ranges
    var xScale = d3.scaleLinear()
                   .domain([0, d3.max(lineData, function(d) { return d[0]; })])
                   .range([0, this.width]);
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(lineData, function(d) { return d[1]; })])
                   .range([this.height, 0]);

    // define the line
    var valueline = d3.line()
                      .x(function(d) { return xScale(d[0]); })
                      .y(function(d) { return yScale(d[1]); });

    this.globalSVG.append('path')
                  .data([lineData])
                  .attr("class", "line green")
                  .attr("d", valueline);

    this.globalSVG.append('path')
                  .data([lineData2])
                  .attr("class", "line blue")
                  .attr("d", valueline);

    var tooltip = d3.select("body").append("div")
                                .style("position", "absolute")
                                .style("z-index", "10")
                                .style("visibility", "hidden")
                                .attr("class", "tooltip")
                                .text("a simple tooltip");

    var graphPoints =
    this.globalSVG.selectAll('circle')
                  .data(lineData.concat(lineData2))
                  .enter()
                  .append('circle');
    graphPoints.attr("cx", function(d) {
                    return xScale(d[0]);
                  })
                .attr("cy", function(d) {
                    return yScale(d[1]);
                  })
                .attr("r", 3)
                .on("mouseover", function(){return tooltip.style("visibility", "visible");})
                .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
                .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    // Add the X Axis
    this.globalSVG.append("g")
                  .attr("transform", "translate(0," + this.height + ")")
                  .call(d3.axisBottom(xScale));

    // Add the Y Axis
    this.globalSVG.append("g")
                  .call(d3.axisLeft(yScale));

  }
}
