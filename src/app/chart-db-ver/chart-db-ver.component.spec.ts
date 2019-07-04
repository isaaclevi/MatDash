import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDbVerComponent } from './chart-db-ver.component';

describe('ChartDbVerComponent', () => {
  let component: ChartDbVerComponent;
  let fixture: ComponentFixture<ChartDbVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDbVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDbVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
