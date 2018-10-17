import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-absence-line-chart',
  templateUrl: './absence-line-chart.component.html',
  styleUrls: ['./absence-line-chart.component.css']
})
export class AbsenceLineChartComponent {

    // lineChart

    @Input() public chartData: Array<any>;
    /*
    e.g.,
    [
        { data: [65, 59, , 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, , 27, 40], label: 'Series C' }
    ];
    */

    @Input() public chartLabels: Array<any>; //  e.g., ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

   // see http://www.chartjs.org/docs/#chart-configuration-global-configuration
    public chartOptions: any = {
        responsive: true,
        spanGaps : true ,  // if there is a gap (NaN), line will not break if set to true. default is false
    };

    public chartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.0)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,0.8)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.0)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,0.8)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public chartLegend = true;
    public chartType = 'line';


    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

}
