import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'D3 Practice!';
  data: any = [5,10,15,20,25];


  saveData(data) {
    this.data = data;
  }
}
