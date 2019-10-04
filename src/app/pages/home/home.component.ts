import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "Welcome to Trevor's predictive application";
  subtitle = "Where predictions are made on the fly";
  weather:any;
  loading:Boolean = false;
  city: string;
  country: string;

  constructor(private chartService: ChartsService) { }

  ngOnInit() {}

  // methods
  getWeather() {
   this.loading = true
   this.chartService.getWeather(this.city, this.country).subscribe(
      data => {
        this.weather = data;
      },
      err => console.error(err),
      () => {
        this.loading = false
      }
    );
  }

}
