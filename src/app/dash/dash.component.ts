import { HttpService } from './../http.service';
import { Component, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

@HostListener('window:resize', ['$event'])

export class DashComponent implements OnInit, AfterViewInit {
  public cards;
  public isContentEmpty: boolean;
  public cardsTitles: string[];
  public grid;
  public arrCards: any[];
  private user;


  constructor(private breakpointObserver: BreakpointObserver, private httpApi: HttpService) {
    this.isContentEmpty = true;
    this.arrCards = [
      { title: 'Card 1', cols: 1, rows: 1 , CardContent: 'content 1' },
      { title: 'Card 2', cols: 1, rows: 1 , CardContent: 'content 2' },
      { title: 'Card 3', cols: 1, rows: 1 , CardContent: 'content 3' },
      { title: 'Card 4', cols: 1, rows: 1 , CardContent: 'content 4' },
      { title: 'Card 5', cols: 1, rows: 1 , CardContent: 'content 5' },
      { title: 'Card 6', cols: 1, rows: 1 , CardContent: 'content 6' }
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
    for (let i = this.arrCards.length - 1; i >= 0; i--) {
      if (this.arrCards[i].title.split(' ')[0] == 'Card') {
        num = Number(this.arrCards[i].title.split(' ')[1]);
        // console.log(num);
        break;
      }
    }
    if (num === 0) {
      num = 0;
    }
    this.arrCards.push({ title: 'Card ' + (num + 1), cols: 1, rows: 1 , CardContent: 'content ' + (num + 1)});
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
    if (this.grid != 1) {
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
      if (card.title == cardTitle) {
        card.title = newCardTitle + ' ' + cardTitle.split(' ')[1];
      }
    });
  }

  // on title change connect chart
  onTitleChangeConnectChart(title) {
    // if (this.cardsTitles == null) {
    //   return false;
    // }
    this.cardsTitles.forEach(cardTitle => {
      if (cardTitle == title.split(' ')[0]) {
        console.log(true);
        return true;
      }
    });
    console.log(false);
    return false;
  }
}
/*
export class User implements OnInit {
  ngOnInit(): void {
    this.createClass();
  }

  createClass() {
    for (let i = 0; i < cardTitles.length; i++) {

    }
  }
}*/
