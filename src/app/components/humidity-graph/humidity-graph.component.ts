import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-humidity-graph',
  templateUrl: './humidity-graph.component.html',
  styleUrls: ['./humidity-graph.component.scss']
})
export class HumidityGraphComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  @Input() chartData:any;

  chartOptions: Highcharts.Options = {};
  startDate= Date.UTC(2019, 9, 10);

  constructor() { }

  ngOnInit() {
    this.setChartOptions(this.chartData)
  }

  setChartOptions(data) {
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
        title: {
          text: 'Humidity'
        }
      },
      title: {
        text: 'Date vrs Humidity',
        style: {
          color: 'orange'
        }
      },
      series: [{
        data: data.list.map(el => [el.dt_txt, el.main.humidity]),
        type: 'line',
        name: 'Humidity',
        pointStart: this.startDate,
        pointInterval: 3 * 24 * 3600 * 1000
      }],
    };
  }

}
