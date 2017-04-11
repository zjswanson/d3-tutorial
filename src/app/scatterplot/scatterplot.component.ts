import { Component, OnInit, OnChanges, ElementRef, Input } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit, OnChanges {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private parentNativeElement: any;
  @Input() data: any;
  @Input() data2D: any;
  w: number = 500;
  h: number = 300;
  barGraphSVG: any;

  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
     this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
     this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.barGraphSVG = this.d3.select('#output').append("svg");
    console.log(this.barGraphSVG);
    this.barGraphSVG.attr("width", this.w).attr("height", this.h);

    let d3 = this.d3; // <-- for convenience use a block scope variable
    let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)

    if (this.parentNativeElement !== null) {
      d3ParentElement = d3.select(this.parentNativeElement);
      this.createAndColorParagraphs();


      let svg = d3.select('body').append("svg");
      svg.attr("width", this.w)
        .attr("height", this.h);

      let circles = svg.selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle");

      circles.attr("cx", function(d, i) {
          return (i * 50) + 25;
        })
        .attr("cy", this.h/2)
        .attr("r", function(d: any) {
          return d;
        })
        .attr("fill", "blue");

        this.createBarGraph(this.w,this.h);
        this.labelBarGraph(this.w,this.h);


    }
  }

  ngOnChanges() {
    if (this.barGraphSVG) {
      this.createBarGraph(this.w,this.h);
      this.labelBarGraph(this.w,this.h);
    }
    this.updateParagraphs();
    this.drawScatterPlot();
  }

  createBarGraph(w,h) {
    let barWidth = w / this.data.length;
    let graph = this.barGraphSVG.selectAll("rect").data(this.data)

      graph.enter()
      .append('rect')
      .merge(graph)
      .transition()
      .attr("width", barWidth)
      .attr("height", function(d: any) {
        return 5*d;
      })
      .attr("y", function(d: any) {
        return h - 5 * d;
      })
      .attr("x", function(d: any, i) {
        return i * barWidth;
      })
      .attr("fill", function(d: any) {
        return "rgb(0, 0, " + d*10 + ")";
      });
  }

  labelBarGraph(w,h) {

    let barWidth = w / this.data.length;
    let labels = this.barGraphSVG.selectAll("text").data(this.data)

    labels.enter()
      .append("text")
      .merge(labels)
      .transition()
      .text(function(d: any) {
        return d;
      })
      .attr("x", function(d: any, i) {
        return i * barWidth;
      })
      .attr("y", function(d: any) {
        return h - 5*d;
      });


  }

  createAndColorParagraphs() {
    this.d3.select('body').selectAll('p')
      .data(this.data)
      .enter()
      .append('p')
      .text(function(d) {
        return 'I contain ' + d + '!';
      })
      .style("color", function(d) {
          if (d > 15) {   //Threshold of 15
              return "red";
          } else {
              return "black";
          }
      });
  }
  updateParagraphs() {
    this.d3.select('body').selectAll('p')
      .data(this.data)
      .text(function(d) {
          return 'I have a value of' + d;
      })
      .style("color", function(d) {
          if (d > 15) {   //Threshold of 15
              return "red";
          } else {
              return "black";
          }
      });
  }

  drawScatterPlot() {
    let w = 500, h = 500;

    let xValues =
    this.data2D.map(function(el) {
      return el[0];
    }).sort(function(a,b) {return b-a;});
    let yValues =
    this.data2D.map(function(el) {
      return el[1];
    }).sort(function(a,b) {return b-a;});
    let maxX = xValues[0];
    let maxY = yValues[0];
    console.log(maxX);
    console.log(maxY);

    let padding = 30;
    let xScale = this.d3.scaleLinear()
                        .domain([0, maxX])
                        .range([padding, w - padding * 2]);
    let yScale = this.d3.scaleLinear()
                        .domain([0, maxY])
                        .range([h - padding, padding]);
    let rScale = this.d3.scaleLinear()
                        .domain([0, maxY])
                        .range([2, 5]);

    let scatterSVG = this.d3.select('body')
                            .append('svg')
                            .attr("width", w)
                            .attr("height", h);

    let xAxis = this.d3.axisBottom(xScale)
                        .ticks(5);

    let yAxis = this.d3.axisLeft(yScale)
                        .ticks(5);

    let circles =
    scatterSVG.selectAll('circle')
              .data(this.data2D)
              .enter()
              .append('circle');
    circles.attr("cx", function(d) {
                return xScale(d[0]);
    })
    .attr("cy", function(d) {
          return yScale(d[1]);
    })
    .attr("r", function(d) {
      return rScale(d[1]);
    });


    scatterSVG.selectAll('text')
              .data(this.data2D)
              .enter()
              .append("text")
              .text(function(d) {
                return d[0] + ", " + d[1];
              })
              .attr("x", function(d) {
                return xScale(d[0]);
              })
              .attr("y", function(d) {
                return yScale(d[1]);
              })
              .attr("font-size", "11px")
              .attr("font-family", "sans-serif")
              .attr("fill", "red");


      scatterSVG.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

      scatterSVG.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + padding + ",0)")
                .call(yAxis);
  }

}
