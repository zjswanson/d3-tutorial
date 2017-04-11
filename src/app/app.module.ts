import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { D3Service } from 'd3-ng2-service';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { DataFormComponent } from './data-form/data-form.component';
import { ShapesComponent } from './shapes/shapes.component';
import { ExampleComponent } from './example/example.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ScatterplotComponent,
    DataFormComponent,
    ShapesComponent,
    ExampleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
