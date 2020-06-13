import { Component, ViewChild, OnInit } from '@angular/core';
import * as Chart from "chart.js";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.buildChartfromService();
  }

  //  ankesh
  dataFromService = [
    {
      month: "May",
      inspections: [
        {
          formName: "Depot Inspection",
          month: null,
          count: 1,
          color: "red"
        },
        {
          formName: "Depot Outward App",
          month: null,
          count: 2,
          color: "orange"
        },
        {
          formName: "Retailer Stock",
          month: null,
          count: 1,
          color: "gray"
        },
        {
          formName: "Supplier Outward App",
          month: null,
          count: 4,
          color: "black"
        }
      ]
    },
    {
      month: "June",
      inspections: [
        {
          formName: "Depot Inspection",
          month: null,
          count: 2,
          color: "red"
        },
        {
          formName: "Depot Outward App",
          month: null,
          count: 3,
          color: "orange"
        },
        {
          formName: "Retailer Stock",
          month: null,
          count: 2,
          color: "gray"
        },
        {
          formName: "Supplier Outward App",
          month: null,
          count: 0,
          color: "black"
        }
      ]
    },
    {
      month: "July",
      inspections: [
        {
          formName: "Depot Inspection",
          month: null,
          count: 2,
          color: "red"
        },
        {
          formName: "Depot Outward App",
          month: null,
          count: 2,
          color: "orange"
        },
        {
          formName: "Retailer Stock",
          month: null,
          count: 1,
          color: "gray"
        },
        {
          formName: "Supplier Outward App",
          month: null,
          count: 3,
          color: "black"
        }
      ]
    }
  ];
  chartDataSets = [];
  chartLabels = [];
  barchart;
  @ViewChild("barchart", { static: true }) public barchartRef;

  buildChartfromService() {
    this.dataFromService.forEach(element => {
      this.chartLabels.push(element["month"]);
    });

    let data: any = {};
    this.dataFromService.forEach(element => {
      element.inspections.forEach(ele => {
        let x = [];
        let key = ele.formName
        x.push(ele['count']);
        if (data[key] != undefined) {
          for (var k in data) {
            if (k == key)
              data[key].push(ele['count']);
          }
        } else {
          data[key] = x;
        }
      });
    });

    for (var k in data) {
      this.chartDataSets.push({
        fill: false,
        backgroundColor: this.generateColorCodes(),
        borderColor: "",
        data: data[k],
        stack: "stackedBar",
        label: k,
        lineTension: 0,
        pointBackgroundColor: "black",
        pointBorderColor: "black",
        pointHoverBackgroundColor: "black",
        pointHoverBorderColor: "#fff"
      });
    }
    this.drawChart();
  }

  generateColorCodes() {
    let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    return randomColor;
  }

  drawChart() {
    this.barchart = new Chart(this.barchartRef.nativeElement.getContext("2d"), {
      type: "bar",
      data: {
        labels: this.chartLabels,
        datasets: this.chartDataSets
      },
      options: {
        responsive: true,
        responsiveAnimationDuration: 2000,
        maintainAspectRatio: true,
        title: {
          display: true
        },
        layout: {
          padding: {
            bottom: 5,
            top: 5
          }
        },
        legend: {
          display: true
        },
        scales: {
          // We use this empty structure as a placeholder for dynamic theming.
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                display: true
              }
            }
          ]
        }
      }
    });
  }
}
