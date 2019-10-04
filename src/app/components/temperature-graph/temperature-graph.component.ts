import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss']
})

export class TemperatureGraphComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() chartData:any;

  chartOptions: Highcharts.Options = {};
  startDate= Date.UTC(2019, 9, 10);
  type: Boolean = true;

  constructor() { }

  ngOnInit() {
    this.setChartOptions(this.chartData, this.type)
  }

  setChartOptions(data, type) {
    this.chartOptions = {
      chart: {
        zoomType: 'x',
        panning: true,
        pinchType: 'x'
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%d %b', this.value);
          },
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        type: 'datetime',
        labels: {
          formatter: function() {
            return `${this.value} ${type ? 'C' : 'K'}`
          }
        },
        title: {
          text: 'Temperature'
        }
      },
      tooltip: {

      },
      title: {
        text: 'Date vrs Temperature',
        style: {
          color: 'orange'
        }
      },
      series: type ? [{
        data: data.list.map(el => [el.dt_txt, el.main.temp]),
        type: 'line',
        name: 'Temperature',
        pointStart: this.startDate,
        pointInterval: 3 * 24 * 3600 * 1000
      }, {
        data: data.list.map(el => [el.dt_txt, el.main.temp_min]),
        type: 'line',
        name: 'Minimum Temperature',
        pointStart: this.startDate,
        pointInterval: 3 * 24 * 3600 * 1000
      }, {
        data: data.list.map(el => [el.dt_txt, el.main.temp_max]),
        type: 'line',
        pointStart: this.startDate,
        name: 'Maximum Temperature',
        pointInterval: 3 * 24 * 3600 * 1000
      }] : [{
        data: data.list.map(el => [el.dt_txt, el.main.temp_kf]),
        type: 'line',
        name: 'Temperature in Kelvin',
        pointStart: this.startDate,
        pointInterval: 3 * 24 * 3600 * 1000
      }],
    };
  }

}
