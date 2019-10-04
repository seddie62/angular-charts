import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartsService } from '../../services/charts.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  foods:any = [];
  loading:Boolean = false;

  constructor(private chartService: ChartsService) { }

  ngOnInit() {
    this.getChartData();
    // Highcharts.chart('container', this.options);
  }

  getChartData() {
   this.loading = true
   this.chartService.getChartData().subscribe(
      data => {
        this.foods = data;
        this.setChartOptions(data)
      },
      err => console.error(err),
      () => {
        this.loading = false
        console.log('done loading foods')
      }
    );
  }

  setChartOptions(data) {
    console.log('data', data);

    this.chartOptions = {
      series: [{
        data: [1, 2, 3],
        type: 'line'
      }]
    };
  }
}
