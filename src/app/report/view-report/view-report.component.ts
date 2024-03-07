import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { Chart, Tooltip } from 'chart.js'
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectManagementService } from 'src/app/shared/services/project-management.service';
import { TempRiseCalculationRequest } from 'src/app/shared/models/project-management';
import { LinearGraphDataVM, CurvedGraphDataVM, TempRiseCalculationResponse } from 'src/app/shared/models/project-management/temp.rise.calculation.response';
import { ActivatedRoute } from '@angular/router';
import { QueryParmEnum } from 'src/app/shared/util/enumData';
@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})

export class ViewReportComponent implements OnInit {
  a: number = 1;
  b: number = 0;
  c: number = 0;
  d: number = 0;
  e: number = 0;
  gr: number = 0;
  curvedRangeStart: number = 0;
  curvedRangeEnd: number = 40;
  rangeMax: number = 100;
  isGettingData: boolean = false;
  linearGraphData: LinearGraphDataVM | undefined;
  curvedGraphData: CurvedGraphDataVM | undefined;
  linearXValues: any;
  linearYValues: any;
  cubicleId: number = 1;
  reportData: any;
  queryParmEnum = QueryParmEnum;
  projectNo: any;

  constructor(
    private projectManagementService: ProjectManagementService,
    public dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    Chart.register([Tooltip]);
    if (this.activatedRoute.snapshot.queryParams[QueryParmEnum.cubicleId]) {
      const cubicleId = atob(this.activatedRoute.snapshot.queryParams[this.queryParmEnum.cubicleId]);
      this.cubicleId = Number(cubicleId);
    }
    this.calculateTempRise();
  }

  calculateTempRise() {
    this.isGettingData = true;

    const tempRiseRequest: TempRiseCalculationRequest = {
      cubicleId: this.cubicleId
    }

    this.projectManagementService.calculateTempRise(tempRiseRequest).subscribe((data: TempRiseCalculationResponse) => {
      this.isGettingData = false;
      if (data) {
        //Report data
        this.reportData = data.reportData;
        this.projectNo = this.reportData.projectNo;

        //Linear graph data
        this.linearGraphData = data.linearGraph;
        this.linearXValues = this.linearGraphData?.points?.xValues;
        this.linearYValues = this.linearGraphData?.points?.yValues;

        if (this.linearYValues) {
          this.linearYValues = this.linearYValues.map((value: number) => value / 100);
        }

        this.d = this.linearGraphData?.coefficients?.d!;
        this.e = this.linearGraphData?.coefficients?.e!;

        //Curved graph data
        this.curvedGraphData = data.curvedGraph;
        this.b = this.curvedGraphData?.b!;
        this.c = this.curvedGraphData?.c!;
        this.gr = this.curvedGraphData?.gr!;

        this.generateChart();
      }
    })
  }

  generatePDF() {
    const doc = new jspdf({
      format: 'a4',
      orientation: 'portrait',
    });

    const reportBody = document.getElementById('report-body');
    const chart = document.getElementById('chart');

    // Capture report-body content
    html2canvas(reportBody!, { scale: 2, scrollY: -window.scrollY }).then((canvas1: any) => {
      const contentWidth1 = canvas1.width;
      const contentHeight1 = canvas1.height;

      doc.addImage(canvas1.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);

      // Add a new page for the chart
      doc.addPage();

      // Capture chart content
      html2canvas(chart!, { scale: 2, scrollY: -window.scrollY }).then((canvas2: any) => {
        const contentWidth2 = canvas2.width;
        const contentHeight2 = canvas2.height;

        doc.addImage(canvas2.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);

        const filename = `temp_rise_cal_report_${this.projectNo}_CUB_${this.cubicleId}.pdf`;

        doc.save(filename);
      });
    });
  }

  generateChart(): void {
    const chartData = this.calculateChartData();

    const canvas = document.getElementById('tempRiseChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.xValues,
          datasets: [
            {
              label: 'Temperature rise',
              data: chartData.yValues,
              borderColor: 'red',
              fill: false,
              borderWidth: 1,
              pointBorderWidth: 1,
              pointHoverRadius: 1,
              pointHoverBorderWidth: 1,
              pointRadius: 1,
              pointHitRadius: 1,
              tension: 0.4,
              // borderDash: [5, 5],
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              title: {
                display: true,
                text: 'Temperature rise of air inside enclouse',
                font: {
                  size: this.getFontSize(),
                  weight: '500'
                }
              },
              beginAtZero: true,
            },
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'Multiple of enclosure height',
                font: {
                  size: this.getFontSize(),
                  weight: '500'
                }
              },
              beginAtZero: true
            }
          },
          elements: {
            line: {
              tension: 0.4,
            },
          },
          plugins: {
            legend: {
              display: false
            }
          },
        }
      });
    }
  }

  // calculateChartData(): { labels: string[], data: number[] } {
  //   const labels: string[] = [];
  //   const data: number[] = [];
  //   const stepSize = 0.1;

  //   for (let x = this.curvedRangeStart; x <= this.rangeMax; x += stepSize) {
  //     labels.push(x.toFixed(2));

  //     if (x <= this.curvedRangeEnd) {
  //       // const yCurved = this.x * Math.exp(this.b * x + this.c);
  //       const yCurved = this.a * x * x;
  //       data.push(yCurved);
  //     } else {
  //       const yLinear = this.d * x + this.e;
  //       data.push(yLinear);
  //     }
  //   }
  //   return { labels, data };
  // }


  calculateChartData(): { xValues: string[], yValues: number[] } {
    let xValues: string[] = [];
    let yValues: number[] = [];

    // Curved part
    // for (let x = this.curvedRangeStart; x <= this.linearXValues[0]; x += 0.1) {
    //   xValues.push(x.toFixed(2));
    //   const yCurved =Math.exp(this.a * x);
    //   yValues.push(yCurved);
    // }

    // Linear part
    if (this.linearXValues && this.linearYValues) {
      for (let i = 0; i < this.linearXValues.length; i++) {
        xValues.push(this.linearXValues[i].toFixed(2));
        yValues.push(this.linearYValues[i]);
      }
    }
    return { xValues, yValues };
  }

  getFontSize() {
    const screenWidth = window.innerWidth;
    return screenWidth < 576 ? 8 : 14;
  }
}