import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private parentNativeElement: any;
  @Input() data: any;
  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
     this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
     this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
   let d3 = this.d3; // <-- for convenience use a block scope variable
   let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)


   if (this.parentNativeElement !== null) {

     d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method
     // Do more D3 things
    d3.select('body').selectAll('p')
        .data(this.data)
        .enter()
        .append('p')
        .text('I contain something!')
        .style("color", function(d) {
            if (d > 15) {   //Threshold of 15
                return "red";
            } else {
                return "black";
            }
        });

   }
  }

}
