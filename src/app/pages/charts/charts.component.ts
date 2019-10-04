import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartsService } from '../../services/charts.service';
import { format } from 'date-fns'

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
  // data options
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };


  chartData:any;
  loading:Boolean = false;
  startDate= Date.UTC(2019, 10, 10);

  // constructor

  constructor(private chartService: ChartsService) { }

  ngOnInit() {
    this.getChartData();
    // Highcharts.chart('container', this.options);
  }

  // methods
  getChartData() {
   this.loading = true
   this.chartService.getChartData().subscribe(
      data => {
        this.chartData = data;
        console.log('chart',data);

        this.setChartOptions(data)
      },
      err => console.error(err),
      () => {
        this.loading = false
        console.log('done loading chartData')
      }
    );
  }

  setChartOptions(data) {
    console.log('data', data);
    console.log('point', this.startDate);

    console.log('map', data.list.map(el => {
      var newSet = {
        x: el.dt_txt,
        y: el.main.temp
      }
      return [el.dt_txt, el.main.temp]
    }));

    this.chartOptions = {
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%d %b', this.value);
          }
        },
        title: {
          text: 'AHA'
        }
      },
      title: {
        text: 'Date vrs Temp',
        style: {
          color: 'orange'
        }
      },
      series: [{
        data: data.list.map(el => {
          var newSet = {
            x: el.dt_txt,
            y: el.main.temp,
            dataLabel: el.dt_txt,
          }
          return [el.dt_txt, el.main.temp]
        }),
        type: 'line',
        pointStart: this.startDate,
        pointInterval: 3 * 24 * 3600 * 1000
      }],
    };
  }

  setStartDate() {
    // return new Date(Date.UTC())
  }
}
