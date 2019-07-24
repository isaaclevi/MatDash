import { HttpService } from './../http.service';
import { Component, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Card } from '../CardClass';


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
  public arrCards: Card[];


  constructor(private breakpointObserver: BreakpointObserver, private httpApi: HttpService) {
    this.arrCards = [
      { id: '1', title: 'Card 1', cols: 1, rows: 1 , cardContent: 'content 1', isChanged: false, cardInView: false },
      { id: '2', title: 'Card 2', cols: 1, rows: 1 , cardContent: 'content 2', isChanged: false, cardInView: false },
      { id: '3', title: 'Card 3', cols: 1, rows: 1 , cardContent: 'content 3', isChanged: false, cardInView: false },
      { id: '4', title: 'Card 4', cols: 1, rows: 1 , cardContent: 'content 4', isChanged: false, cardInView: false },
      { id: '5', title: 'Card 5', cols: 1, rows: 1 , cardContent: 'content 5', isChanged: false, cardInView: false },
      { id: '6', title: 'Card 6', cols: 1, rows: 1 , cardContent: 'content 6', isChanged: false, cardInView: false }
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
      this.onTitleInit(val[0]);
    });
  }

  ngAfterViewInit(): void {
  }

  // add a card to the dashboard
  onAdd() {
    let num = 0;
    if (this.arrCards != null && this.arrCards !== []) {
      num = Number(this.arrCards[this.arrCards.length - 1].title.split(' ')[1]);
    }
    if (num === 0) {
      num = 0;
    }
    this.arrCards.push({
      id: (num + 1).toString(),
      title: 'Card ' + (num + 1),
      cols: 1,
      rows: 1,
      cardContent: 'content ' + (num + 1),
      isChanged: false,
      cardInView: false
    });
  }
  //// remove card
  onRemove(card) {
    const index = this.arrCards.indexOf(card);
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
  onTitleInit(val) {
    let stringArr;
    stringArr = Object.keys(val);
    stringArr.splice(0, 3);
    this.cardsTitles = stringArr;
    console.log(this.cardsTitles);
  }
  // change card title
  onTitleChange(newCardTitle, card) {
    if (card.title.split(' ')[0] !== newCardTitle) {
      card.isChanged = true;
      card.isInView = false;
    }
    card.cardContent  = newCardTitle;
    card.title = newCardTitle + ' ' + card.title.split(' ')[1];
  }
  // view was init
  onView(event: Card) {
    if (event.isChanged) {
      event.cardInView = true;
    }
  }

  // remove view from dash
  changView(card: Card) {
    card.isChanged = false;
  }
}
