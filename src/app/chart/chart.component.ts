import { element } from 'protractor';
import { Card } from './../CardClass';
import { Component, Input, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpService } from './../http.service';
import 'chartjs-plugin-labels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  // data to retrive from user
  public dataType: string;
  public biggestVer: string;
  public inputBig: string;
  public inputSmall: string;
  public list;
  public tableAtt;
  // card info
  private _cardVal;
  // all db users
  private _users: any[];
  private _canv;
  private _chart: Chart;
  private chartDataInit: {dataArr: any[], lablesArr: string[]};
  private arr: {lable: string, data: number}[];
  private colorsArr: string[];
  private isChartChanged: boolean;
  @Output() viewChanged;

  constructor(private api: HttpService) {
    this.inputBig = '0';
    this.isChartChanged = false;
    this.viewChanged = new EventEmitter();
    this.colorsArr = [
      '#63b598', '#ce7d78', '#ea9e70', '#a48a9e', '#c6e1e8', '#648177', '#0d5ac1',
      '#f205e6', '#1c0365', '#14a9ad', '#4ca2f9', '#a4e43f', '#d298e2', '#6119d0',
      '#d2737d', '#c0a43c', '#f2510e', '#651be6', '#79806e', '#61da5e', '#cd2f00',
      '#9348af', '#01ac53', '#c5a4fb', '#996635', '#b11573', '#4bb473', '#75d89e',
      '#2f3f94', '#2f7b99', '#da967d', '#34891f', '#b0d87b', '#ca4751', '#7e50a8',
      '#c4d647', '#e0eeb8', '#11dec1', '#289812', '#566ca0', '#ffdbe1', '#2f1179',
      '#935b6d', '#916988', '#513d98', '#aead3a', '#9e6d71', '#4b5bdc', '#0cd36d',
      '#250662', '#cb5bea', '#228916', '#ac3e1b', '#df514a', '#539397', '#880977',
      '#f697c1', '#ba96ce', '#679c9d', '#c6c42c', '#5d2c52', '#48b41b', '#e1cf3b',
      '#5be4f0', '#57c4d8', '#a4d17a', '#225b8', '#be608b', '#96b00c', '#088baf',
      '#f158bf', '#e145ba', '#ee91e3', '#05d371', '#5426e0', '#4834d0', '#802234',
      '#6749e8', '#0971f0', '#8fb413', '#b2b4f0', '#c3c89d', '#c9a941', '#41d158',
      '#fb21a3', '#51aed9', '#5bb32d', '#807fb', '#21538e', '#89d534', '#d36647',
      '#7fb411', '#0023b8', '#3b8c2a', '#986b53', '#f50422', '#983f7a', '#ea24a3',
      '#79352c', '#521250', '#c79ed2', '#d6dd92', '#e33e52', '#b2be57', '#fa06ec',
      '#1bb699', '#6b2e5f', '#64820f', '#1c271', '#21538e', '#89d534', '#d36647',
      '#7fb411', '#0023b8', '#3b8c2a', '#986b53', '#f50422', '#983f7a', '#ea24a3',
      '#79352c', '#521250', '#c79ed2', '#d6dd92', '#e33e52', '#b2be57', '#fa06ec',
      '#1bb699', '#6b2e5f', '#64820f', '#1c271', '#9cb64a', '#996c48', '#9ab9b7',
      '#06e052', '#e3a481', '#0eb621', '#fc458e', '#b2db15', '#aa226d', '#792ed8',
      '#73872a', '#520d3a', '#cefcb8', '#a5b3d9', '#7d1d85', '#c4fd57', '#f1ae16',
      '#8fe22a', '#ef6e3c', '#243eeb', '#1dc18', '#dd93fd', '#3f8473', '#e7dbce',
      '#421f79', '#7a3d93', '#635f6d', '#93f2d7', '#9b5c2a', '#15b9ee', '#0f5997',
      '#409188', '#911e20', '#1350ce', '#10e5b1', '#fff4d7', '#cb2582', '#ce00be',
      '#32d5d6', '#17232', '#608572', '#c79bc2', '#00f87c', '#77772a', '#6995ba',
      '#fc6b57', '#f07815', '#8fd883', '#060e27', '#96e591', '#21d52e', '#d00043',
      '#b47162', '#1ec227', '#4f0f6f', '#1d1d58', '#947002', '#bde052', '#e08c56',
      '#28fcfd', '#bb09b', '#36486a', '#d02e29', '#1ae6db', '#3e464c', '#a84a8f',
      '#911e7e', '#3f16d9', '#0f525f', '#ac7c0a', '#b4c086', '#c9d730', '#30cc49',
      '#3d6751', '#fb4c03', '#640fc1', '#62c03e', '#d3493a', '#88aa0b', '#406df9',
      '#615af0', '#4be47', '#2a3434', '#4a543f', '#79bca0', '#a8b8d4', '#00efd4',
      '#7ad236', '#7260d8', '#1deaa7', '#06f43a', '#823c59', '#e3d94c', '#dc1c06',
      '#f53b2a', '#b46238', '#2dfff6', '#a82b89', '#1a8011', '#436a9f', '#1a806a',
      '#4cf09d', '#c188a2', '#67eb4b', '#b308d3', '#fc7e41', '#af3101', '#ff065',
      '#71b1f4', '#a2f8a5', '#e23dd0', '#d3486d', '#00f7f9', '#474893', '#3cec35',
      '#1c65cb', '#5d1d0c', '#2d7d2a', '#ff3420', '#5cdd87', '#a259a4', '#e4ac44',
      '#1bede6', '#8798a4', '#d7790f', '#b2c24f', '#de73c2', '#d70a9c', '#25b67',
      '#88e9b8', '#c2b0e2', '#86e98f', '#ae90e2', '#1a806b', '#436a9e', '#0ec0ff',
      '#f812b3', '#b17fc9', '#8d6c2f', '#d3277a', '#2ca1ae', '#9685eb', '#8a96c6',
      '#dba2e6', '#76fc1b', '#608fa4', '#20f6ba', '#07d7f6', '#dce77a', '#77ecca'
    ];
  }

  ngOnInit() {
    this.onData();
    this.chartDataInit = this.buildAndSortData();
    this.biggestVer = this.chartDataInit.lablesArr[this.chartDataInit.lablesArr.length - 2];
    this.inputSmall = this.biggestVer;
  }

  ngAfterViewInit() {
    this._canv = (document.getElementById(this._cardVal.id) as HTMLCanvasElement).getContext('2d');
    this._chart = this.initChart();
    if (!this.isChartChanged) {
      this._chart.data.labels = this.chartDataInit.lablesArr;
      this._chart.data.datasets[0].data = this.chartDataInit.dataArr;
      this._chart.update();
    }
    this.viewChanged.emit(this._cardVal);
  }

  get arrUsers() {
    return this._users;
  }

  @Input()
  set arrUsers(value: any[]) {
    this._users = value;
  }

  get chart() {
    return this._chart;
  }

  get canv() {
    return this._canv;
  }

  get cardVal(): Card {
    return this._cardVal;
  }

  @Input()
    set cardVal(value) {
      this.isChartChanged = true;
      this._cardVal = value;
      this.dataType = this._cardVal.cardContent;
      this.isChartChanged = false;
  }

  ///// new chart
  initChart() {
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 15;
    Chart.defaults.global.defaultFontColor = '#777';
    return new Chart(this._canv, {
      type: 'doughnut',
      data: {
        labels: ['offline'],
        datasets: [{
          label: 'empty_chart',
          data: [0, 0],
          backgroundColor: this.colorsArr,
          borderWidth: 1,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: '#777'
        }],
      },
      options: {
        plugins: {
          labels: {
                // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                render: 'value',
                fontSize: 20,
                fontStyle: 'bold',
                fontColor: '#fff',
                fontFamily: '"Lucida Console", Monaco, monospace'
          }
        },
        legend: {
          position: 'left',
          display: true,
        },
        cutoutPercentage: 80, // Here for innerRadius. It's already exists
        responsive: true,
        maintainAspectRatio: true,
      }
    });
  }
  /// new chart //END//


///// on Data from DB filter data to other lable if need be
  async onData() {
    console.log(this._users);
    if (this.arr != null) {
      this.arr = null;
    }
    this.arr = [{lable: 'no_ver', data: 0}];
    const verArrBig = this.inputBig.split('.');
    let verArrSmall;
    if (this.inputSmall != null) {
      verArrSmall = this.inputSmall.split('.');
    }
    let flage = false;
    let userVer = null;
    if (this.inputBig !== '0' || this.inputSmall !== this.biggestVer) {
      this.arr.push({lable: 'other', data: 0});
    }
    for (let i = 0; i < this._users.length; i++) {
      // checking the user version number is not null
      if (this._users[i][this.dataType] != null) {
        // chacking that the lable is not a Module
        if (this.dataType === 'Tis01_Module' || this.dataType === 'TisWin3_Module') {
          // console.log('break');
          break;
        }
        userVer = this._users[i][this.dataType].split('.');
        // elements that are bigger
        flage = this.checkIfBigger(verArrBig, userVer);
        // elements that are smaller
        if (!flage && verArrSmall != null) {
          flage = this.checkIfSmaller(verArrSmall, userVer);
        }
        if (flage) {
          flage = !flage;
          const res = this.arr.find((el) => {
            return el.lable === 'other';
          });
          res.data++;
          continue;
        }
      }
      console.log(this.arr.length);
      this.countUsersPerVer(i);
    }
    console.log(this.arr);
  }

  // check if user version is begger then filter version if not put in "other" lable
  checkIfBigger(verArrBig, userVer) {
    for (let verI = 0; verI < verArrBig.length; verI++) {
      if (verI === 0) {
        if (Number(verArrBig[verI]) > Number(userVer[verI])) {
          return true;
        }
      }
      // checking for vertion number after the first '.'
      if (verI !== 0) {
        if ((Number(verArrBig[verI])
            * Math.pow(10, Math.abs(userVer[verI].length
            - verArrBig[verI].length))) > Number(userVer[verI])) {
          return true;
        }
      }
    }
  }
  // check if user version is Smaller then filter version if not put in "other" lable
  checkIfSmaller(verArrSmall, userVer) {
    for (let verI = 0; verI < verArrSmall.length; verI++) {
      if (verI === 0) {
        if (Number(verArrSmall[verI]) < Number(userVer[verI])) {
          return true;
        }
      }
      // checking for vertion number after the first '.'
      if (verI !== 0) {
        if ((Number(verArrSmall[verI])
            * Math.pow(10, Math.abs(userVer[verI].length
            - verArrSmall[verI].length))) < Number(userVer[verI])) {
          return true;
        }
      }
    }
  }

  // conuting how many users on each version
  countUsersPerVer(index) {
    const res = this.arr.find((obj) => {
      return obj.lable === this._users[index][this.dataType];
    });
    if (res == null) {
      if (this._users[index].enterprise_name !== '' && this._users[index][this.dataType] == null) {
        this.arr[0].data++;
      } else {
        this.arr.push({lable: this._users[index][this.dataType], data: 1});
      }
    } else {
      res.data++;
    }
  }
///// on Data from DB  //end//

  buildChart() {
    const res = this.buildAndSortData();
    this._chart.data.labels = res.lablesArr;
    this._chart.data.datasets[0].data = res.dataArr;
    this._chart.update();
  }

  buildAndSortData() {
    let arrLables = [];
    const arrData = [];
    const obj = {};
    let result;
    for (let i = 0; i < this.arr.length; i++) {
      arrLables[i] = this.arr[i].lable;
      arrData[i] = this.arr[i].data;
      obj[this.arr[i].lable] = this.arr[i].data;
    }
    arrLables = arrLables.sort();
    if (this.inputSmall !== this.biggestVer) {
      this.inputSmall = arrLables[arrLables.length - 3];
    }
    result = this.sortArr(arrLables, obj);
    return {dataArr: result, lablesArr: arrLables};
  }

  onClick() {
    console.log(this.inputBig, this.inputSmall);
    this.onData();
    this.buildChart();
  }
  // sort array of data
  sortArr(sortingArr: string[], objToSort: object) {
    const arr = [];
    for (let i=0; i < sortingArr.length; i++) {
      arr.push(objToSort[sortingArr[i]]);
    }
    return arr;
  }

  onEnter() {
    console.log(this.inputBig, this.inputSmall);
    this.onData();
    this.buildChart();
  }
}