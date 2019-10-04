import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './router/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { HomeComponent } from './pages/home/home.component';

import { ElModule } from 'element-angular'
import { HighchartsChartModule } from 'highcharts-angular';

import { HeaderComponent } from './layout/header/header.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { TemperatureGraphComponent } from './components/temperature-graph/temperature-graph.component';
import { HumidityGraphComponent } from './components/humidity-graph/humidity-graph.component';
import { PressureGraphComponent } from './components/pressure-graph/pressure-graph.component'

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    HomeComponent,
    HeaderComponent,
    SideBarComponent,
    TemperatureGraphComponent,
    HumidityGraphComponent,
    PressureGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ElModule.forRoot(),
    HighchartsChartModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
