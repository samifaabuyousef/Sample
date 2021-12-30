import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  options: any;

  constructor() {
  }

  ngOnInit() {
    this.setChartOptions();
  }

  setChartOptions() {

    this.options =
      {
        backgroundColor: '#2c343c',

        title: {
          text: 'Totla Prescriptions: 600',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 1000,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Video',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 400, name: 'patient playes'},
              {value: 200, name: 'doctor playes'},


            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
  }
}
