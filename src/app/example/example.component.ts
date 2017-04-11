import { Component, OnInit, OnChanges, ElementRef, Input } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit, OnChanges {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private parentNativeElement: any;  // I think this selects the html parent element.  Who knows if we need it, but the service included it in their example
  @Input() data: any;  // Data passed down from parent element
  width: number = 500; // These are gobal values used to scale the component
  height: number = 300; // These are gobal values used to scale the component
  selection: any;


  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
     this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
     this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    // this creates an svg element in the template and saves the reference for future use by display functions
    this.selection = this.d3.select('#exampleOutput').append("svg");
    this.selection.attr("width", this.width).attr("height", this.height);

    this.drawElement(this.width, this.height)  // call the draw function to create the inital state of the visualization
  }

  ngOnChanges() {
    // this if statement prevents the callback from being fired before the html is drawn, which would throw errors
    if (this.selection) {
      this.drawElement(this.width, this.height)  // draws the element again after the data value is update
    }
  }

  //this draws a bar graph
  drawElement(width, height) {
    // this is the key portion that lets this function correctly draw the element as the data is updated.  This takes our selection property then selects the elements within it that we will act on ('rect' in this case), and joins the data.  The reference to this data join is then stored in the join variable.
    let join = this.selection.selectAll("rect").data(this.data)

    let barWidth = width / this.data.length;  //scales element width as function of data domain

      join.exit().remove(); //removes extraneous elements that do not have data

      join.enter()
      .append('rect') // this adds new elements for data that had no place to go
      .merge(join) // puts the update and enter sections of the join together so that all following methods will act on all elements.
      .transition() // Sets the default transition as display changes, and then modifies attributes of all elements in the join.
      .attr("width", barWidth)
      .attr("height", function(d: any) {
        return 5*d;
      })
      .attr("y", function(d: any) {
        return height - 5 * d;
      })
      .attr("x", function(d: any, i) {
        return i * barWidth;
      })
      .attr("fill", function(d: any) {
        return "rgb(0, 0, " + d*10 + ")";
      });
  }

}
