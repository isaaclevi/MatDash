import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvComponent } from './canv.component';

describe('CanvComponent', () => {
  let component: CanvComponent;
  let fixture: ComponentFixture<CanvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
