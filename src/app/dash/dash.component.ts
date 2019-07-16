import { HttpService } from './../http.service';
import { Component, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

@HostListener('window:resize', ['$event'])

export class DashComponent implements OnInit, AfterViewInit {
  public cards;
  public isContentEmpty: boolean[];
  public isContentChanged: boolean[];
  public cardsTitles: string[];
  public grid;
  public arrCards: any[];


  constructor(private breakpointObserver: BreakpointObserver, private httpApi: HttpService) {
    this.arrCards = [
      { id: '1', title: 'Card 1', cols: 1, rows: 1 , CardContent: 'content 1', isContentEmpty: true, dataType: null},
      { id: '2', title: 'Card 2', cols: 1, rows: 1 , CardContent: 'content 2', isContentEmpty: true, dataType: null},
      { id: '3', title: 'Card 3', cols: 1, rows: 1 , CardContent: 'content 3', isContentEmpty: true, dataType: null},
      { id: '4', title: 'Card 4', cols: 1, rows: 1 , CardContent: 'content 4', isContentEmpty: true, dataType: null},
      { id: '5', title: 'Card 5', cols: 1, rows: 1 , CardContent: 'content 5', isContentEmpty: true, dataType: null},
      { id: '6', title: 'Card 6', cols: 1, rows: 1 , CardContent: 'content 6', isContentEmpty: true, dataType: null}
    ];

    /** Based on the screen size, switch from standard to one column per row */
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.arrCards;
        }
        this.arrCards[0].cols = 1;
        this.arrCards[0].rows = 1;
        this.arrCards[2].rows = 1;
        return this.arrCards;
      })
    );
  }

  ngOnInit(): void {
    this.cardsTitles = [];
    this.grid = 2;
    this.httpApi.getUsers().subscribe(async (val) => {
      this.onTitleClick(val[0]);
    });
  }

  ngAfterViewInit(): void {
  }

  // add a card to the dashboard
  onAdd() {
    let num = 0;
    if(this.arrCards != null && this.arrCards != []) {
      num = Number(this.arrCards[this.arrCards.length-1].title.split(' ')[1]);
    }
    if (num === 0) {
      num = 0;
    }
    this.arrCards.push({ id: (num+1).toString(), title: 'Card ' + (num + 1), cols: 1, rows: 1 , CardContent: 'content ' + (num + 1), isContentEmpty: true, dataType: null});
  }
  //// remove card
  onRemove(Card) {
    const index = this.arrCards.indexOf(Card);
    this.arrCards.splice(index, 1);
  }
  // on resize off the screen
  onResize(event) {
    console.log(event);
  }

  onAddCol() {
    if (this.grid < 4) {
      this.grid++;
    }
  }

  onRemoveCol() {
    if (this.grid > 1) {
      this.grid--;
    }
  }

  onExpand() {
    if (this.grid !== 1) {
      this.grid = 1;
    } else {
      this.grid = 2;
    }
  }
  // init title for cards
  onTitleClick(val) {
    let stringArr;
    stringArr = Object.keys(val);
    stringArr.splice(0, 3);
    this.cardsTitles = stringArr;
    console.log(this.cardsTitles);
  }
  // change card title
  onTitleChange(newCardTitle, cardTitle) {
    this.arrCards.forEach(card => {
      if (card.title === cardTitle) {
        card.title = newCardTitle + ' ' + cardTitle.split(' ')[1];
        card.isContentEmpty = false;
        console.log(card);
      }
    });
  }

  // on title change connect chart
  onTitleChangeConnectChart(title) {
    for(let i = 0; i < this.cardsTitles.length; i++ ) {
      if (this.cardsTitles[i] === title.split(' ')[0]) {
        this.isContentEmpty[title.split(' ')[1] - 1] = false;
        break;
      }
    }
    console.log(this.isContentEmpty);
    return this.isContentEmpty[title.split(' ')[1] - 1].toString();
  }
}
