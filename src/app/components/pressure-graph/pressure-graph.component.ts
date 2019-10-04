import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pressure-graph',
  templateUrl: './pressure-graph.component.html',
  styleUrls: ['./pressure-graph.component.scss']
})
export class PressureGraphComponent implements OnInit {

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
          text: 'Pressure'
        }
      },
      title: {
        text: 'Date vrs Pressure',
        style: {
          color: 'orange'
        }
      },
      series: [{
        data: data.list.map(el => [el.dt_txt, el.main.pressure]),
        type: 'line',
        name: 'Pressure',
        pointStart: this.startDate,
        pointInterval: 3 * 24 * 3600 * 1000
      }],
    };
  }

}
